import { useEffect, useState } from "react";
import { NextPage } from "next";
import { GetWorkoutsDocument, GetWorkoutsQuery } from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import Link from "next/link";

const Workouts: NextPage = () => {
  const [
    result,
    setResult,
  ] = useState<GetWorkoutsQuery>({} as GetWorkoutsQuery);
  const { workouts } = result;

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await request(GetWorkoutsDocument);
      setResult(response);
    }

    fetchWorkouts();
  }, []);

  return (
    <Main>
      <h2 className="heading-2">Workouts</h2>
      <ul>
        {workouts && workouts.map(({id, slug, name}) => (
          <li key={id}>
            <Link href={`/workouts/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Workouts;
