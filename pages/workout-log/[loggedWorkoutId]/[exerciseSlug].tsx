import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  GetLoggedSetsByAthleteLoggedWorkoutExerciseDocument,
  GetLoggedSetsByAthleteLoggedWorkoutExerciseQuery,
} from "../../../graphql/generated";
import { request } from "../../../lib/request";
import Main from "../../../components/layout/main/main";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import SidebarMenu from "../../../components/layout/sidebar/sidebar-menu";
import SetTable from "../../../components/workout-log/set-table";

const ExerciseLog = () => {
  const [
    result,
    setResult,
  ] = useState<GetLoggedSetsByAthleteLoggedWorkoutExerciseQuery>();

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

    setResult(response);
  }, [query, user]);

  useEffect(() => {
    if (user && query) {
        fetchLoggedSets();
    }
  }, [query, user, fetchLoggedSets]);

  function makeSidebarMenuLinks() {
    return result && result.loggedWorkout
      ? result.loggedWorkout!.workout!.exercises.map((exercise) => ({
        href: `/workout-log/${query.loggedWorkoutId}/${exercise.slug}`,
        label: exercise.name,
      }))
      : [];
  }

  const handleUpdateSets = () => {
    fetchLoggedSets();
  };

  return (
    <>
      <Sidebar>
        <SidebarMenu
          menuItems={makeSidebarMenuLinks()}
        />
      </Sidebar>
      <Main>
        <SetTable
          title={result?.exercise!.name}
          sets={result?.loggedSets}
          workoutSlug={result?.loggedWorkout!.workout!.slug}
          updateSets={handleUpdateSets}
        />
      </Main>
    </>
  );
};

export default ExerciseLog;
