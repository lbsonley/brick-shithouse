import { useEffect, useState } from "react";
import { NextPage } from "next";
import { GetWorkoutsDocument, GetWorkoutsQuery } from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import Link from "next/link";
import Loading from "../../components/base/loading";

const Workouts: NextPage = () => {
  const [
    result,
    setResult,
  ] = useState<GetWorkoutsQuery>();

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await request(GetWorkoutsDocument);
      setResult(response);
    }

    fetchWorkouts();
  }, []);

  if (result === undefined) return <Loading />;

  return (
    <Main>
      <h2 className="heading-2">Workouts</h2>
      <ul>
        {result.workouts.map(({id, slug, name}) => (
          <li key={id}>
            <Link href={`/workouts/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Workouts;
