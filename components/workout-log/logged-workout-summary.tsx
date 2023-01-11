import { GetLoggedWorkoutByIdQuery } from "../../graphql/generated";
import styles from "./logged-workout-home.module.scss";

interface LoggedWorkoutSummaryProps {
  result: GetLoggedWorkoutByIdQuery;
}

const LoggedWorkoutSummary = ({ result }: LoggedWorkoutSummaryProps) => (
  <div className={styles.loggedWorkoutSummary}>
    <h2
      className={styles.loggedWorkoutSummaryPageTitle}
    >
      {result!.loggedWorkout!.workout!.name}
    </h2>
    <p>{result!.loggedWorkout!.date}</p>

    {result.loggedWorkout?.loggedSets.length! < 1 ? (
      <>
        <p>You have not yet recorded any sets for this workout.</p>
        <p>Select an exercise from the menu on the left to get started.</p>
      </>
    ) : (
      <p>Summary</p>
    )}
  </div>
);

export default LoggedWorkoutSummary;
