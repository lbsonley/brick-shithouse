import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Main from "../../components/layout/main/main";
import { request } from "../../lib/request";
import {
  GetLoggedWorkoutsByUserDocument,
  GetLoggedWorkoutsByUserQuery,
} from "../../graphql/generated";
import Loading from "../../components/base/loading";
import LoggedWorkoutCard
  from "../../components/workout-log/logged-workout-card";
import styles from "./workout-log.module.scss";

const WorkoutLog = () => {
  const { user } = useUser();
  const [result, setResult] = useState<GetLoggedWorkoutsByUserQuery>();

  useEffect(() => {
    async function fetchLoggedWorkouts() {
      const response = await request(
        GetLoggedWorkoutsByUserDocument,
        { athleteAuth0Id: user!.sub},
      );

      setResult(response);
    }

    if (user && user.sub) {
      fetchLoggedWorkouts();
    }

  }, [user]);

  if (result === undefined) return <Loading />;

  return (
    <Main withContentWrapper>
      <h2 className="heading-2">WorkoutLog</h2>
      <ul>
        {result.loggedWorkouts.map((loggedWorkout) => (
          <li
            key={loggedWorkout.id}
            className={styles.workoutLogListItem}
          >
            <LoggedWorkoutCard loggedWorkout={loggedWorkout}/>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default WorkoutLog;
