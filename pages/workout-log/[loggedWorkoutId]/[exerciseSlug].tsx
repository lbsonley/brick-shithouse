import { useEffect, useState } from "react";
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

const ExerciseLog = () => {
  const [
    result,
    setResult,
  ] = useState<GetLoggedSetsByAthleteLoggedWorkoutExerciseQuery>();
  const { query } = useRouter();
  const { user } = useUser();

  useEffect(() => {
    async function fetchLoggedSets() {
      const response = await request(
        GetLoggedSetsByAthleteLoggedWorkoutExerciseDocument,
        {
          athleteAuth0Id: user!.sub,
          loggedWorkoutId: query.loggedWorkoutId,
          exerciseSlug: query.exerciseSlug,
        },
      );

      setResult(response);
    }

    if (user && query) {
        fetchLoggedSets();
    }
  }, [query, user]);

  function makeSidebarMenuLinks() {
    return result && result.loggedWorkout
      ? result.loggedWorkout!.workout!.exercises.map((exercise) => ({
        href: `/workout-log/${query.loggedWorkoutId}/${exercise.slug}`,
        label: exercise.name,
      }))
      : [];
  }

  return (
    <>
      <Sidebar>
        <SidebarMenu
          menuItems={makeSidebarMenuLinks()}
        />
      </Sidebar>
      <Main>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Main>
    </>
  );
};

export default ExerciseLog;
