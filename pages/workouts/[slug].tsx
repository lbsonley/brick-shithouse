import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  GetWorkoutBySlugDocument,
  GetWorkoutBySlugQuery,
} from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";

const WorkoutDetail: NextPage = () => {
  const { query } = useRouter();
  const [
    result,
    setResult,
  ] = useState<GetWorkoutBySlugQuery>({} as GetWorkoutBySlugQuery);
  const { workout } = result;

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await request(GetWorkoutBySlugDocument, {
        slug: query.slug,
      });
      setResult(response);
    }

    fetchWorkouts();
  }, [query.slug]);

  return (
    <Main>
      {workout && (
        <>
          <h2 className="heading-2">{workout!.name}</h2>
          <h3 className="heading-3">Exercises</h3>
          <ul>
            {workout.exercises.map(({id, name}) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </>
      )}
    </Main>
  );
};

export default WorkoutDetail;
