import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  GetWorkoutBySlugDocument,
  GetWorkoutBySlugQuery,
  CreateLoggedWorkoutDocument,
  PublishLoggedWorkoutDocument,
} from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import Button from "../../components/base/button/button";
import { formatDateString } from "../../lib/utils/date-utils";
import Loading from "../../components/base/loading";

const WorkoutDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { query } = router;
  const [
    result,
    setResult,
  ] = useState<GetWorkoutBySlugQuery>();

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await request(GetWorkoutBySlugDocument, {
        slug: query.slug,
      });
      setResult(response);
    }

    if (query.slug) {
      fetchWorkouts();
    }
  }, [query.slug]);

  async function handleStartWorkout(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    const dateString = formatDateString(new Date());

    const { createLoggedWorkout } = await request(CreateLoggedWorkoutDocument, {
      date: dateString,
      athleteAuth0Id: user!.sub,
      workoutSlug: query.slug,
    });

    if (createLoggedWorkout) {
      const { publishLoggedWorkout } = await request(
        PublishLoggedWorkoutDocument,
        { loggedWorkoutId: createLoggedWorkout.id },
      );

      router.push(`/workout-log/${createLoggedWorkout.id}`);
    }
  }

  if (result === undefined) return <Loading />;

  return (
    <Main>
      <>
        <h2 className="heading-2">{result.workout!.name}</h2>
        <h3 className="heading-3">Exercises</h3>
        <ul>
          {result.workout!.exercises.map(({id, name}) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </>
      <Button
        type="button"
        handleClick={handleStartWorkout}
      >Start Workout</Button>
    </Main>
  );
};

export default WorkoutDetail;
