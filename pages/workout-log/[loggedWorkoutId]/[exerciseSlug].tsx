import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {
  GetLastLoggedWorkoutDocument,
  GetLastLoggedWorkoutQuery,
  GetLoggedSetsByAthleteLoggedWorkoutExerciseDocument,
  GetLoggedSetsByAthleteLoggedWorkoutExerciseQuery,
} from "../../../graphql/generated";
import { request } from "../../../lib/request";
import Main from "../../../components/layout/main/main";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import SidebarMenu from "../../../components/layout/sidebar/sidebar-menu";
import SetTable from "../../../components/workout-log/set-table";
import Loading from "../../../components/base/loading";
import styles from "../workout-log.module.scss";

const ExerciseLog = () => {
  const [
    currentLoggedSets,
    setCurrentLoggedSets,
  ] = useState<GetLoggedSetsByAthleteLoggedWorkoutExerciseQuery>();

  const [
    lastLoggedSets,
    setLastLoggedSets,
  ] = useState<GetLastLoggedWorkoutQuery>();

  const { query } = useRouter();
  const { user } = useUser();

  const fetchLoggedSets = useCallback(async () => {
    const response = await request(
      GetLoggedSetsByAthleteLoggedWorkoutExerciseDocument,
      {
        athleteAuth0Id: user!.sub,
        loggedWorkoutId: query.loggedWorkoutId,
        exerciseSlug: query.exerciseSlug,
      },
    );

    setCurrentLoggedSets(response);
  }, [query, user]);

  const fetchLastLoggedWorkout = useCallback(async () => {
    const response = await request(
      GetLastLoggedWorkoutDocument,
      {
        athleteAuth0Id: user!.sub,
        exerciseSlug: query.exerciseSlug,
        workoutSlug: currentLoggedSets?.loggedWorkout?.workout?.slug,
        date: currentLoggedSets?.loggedWorkout?.date,
      },
    );

    setLastLoggedSets(response);
  }, [query, user, currentLoggedSets]);

  useEffect(() => {
    if (user && query) {
        fetchLoggedSets();
    }

    if (currentLoggedSets) {
      fetchLastLoggedWorkout();
    }

  }, [query, user, fetchLoggedSets, fetchLastLoggedWorkout, currentLoggedSets]);

  function makeSidebarMenuLinks() {
    return currentLoggedSets && currentLoggedSets.loggedWorkout
      ? currentLoggedSets.loggedWorkout!.workout!.exercises.map((exercise) => ({
        href: `/workout-log/${query.loggedWorkoutId}/${exercise.slug}`,
        label: exercise.name,
      }))
      : [];
  }

  const handleUpdateSets = () => {
    fetchLoggedSets();
  };

  if (
    currentLoggedSets === undefined
    || lastLoggedSets === undefined
  ) return <Loading />;

  return (
    <>
      <Sidebar>
        <SidebarMenu
          menuItems={makeSidebarMenuLinks()}
        />
      </Sidebar>
      <Main>
        <>
          <Link href={`/workout-log/${query.loggedWorkoutId}`}>
            Back to Workout Summary
          </Link>
          <div className={styles.workoutLogContent}>
            <SetTable
              title={currentLoggedSets.exercise!.name}
              sets={currentLoggedSets.loggedSets}
              workoutSlug={currentLoggedSets.loggedWorkout!.workout!.slug}
              updateSets={handleUpdateSets}
            />
            {(lastLoggedSets.workout!.loggedWorkouts.length > 0) ? (
              <SetTable
                title={`
                  Last Workout:
                  ${lastLoggedSets.workout!.loggedWorkouts[0].date}
                `}
                sets={lastLoggedSets.workout!.loggedWorkouts[0].loggedSets}
              />
            ) : null}
          </div>
        </>
      </Main>
    </>
  );
};

export default ExerciseLog;
