import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  GetLoggedSetsByAthleteLoggedWorkoutExerciseDocument,
  GetLoggedSetsByAthleteLoggedWorkoutExerciseQuery,
} from "../../../graphql/generated";
import { request } from "../../../lib/request";
import Main from "../../../components/layout/main/main";

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

  return (
    <Main>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </Main>
  );
};

export default ExerciseLog;
