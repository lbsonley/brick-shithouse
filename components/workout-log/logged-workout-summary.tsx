import { GetLoggedWorkoutByIdQuery } from "../../graphql/generated";
import { computeVolumeByExercise } from "../../lib/utils/workout-utils";
import styles from "./logged-workout-summary.module.scss";

interface LoggedWorkoutSummaryProps {
  result: GetLoggedWorkoutByIdQuery;
}

const LoggedWorkoutSummary = ({ result }: LoggedWorkoutSummaryProps) => {
  const volumeByExercise =
    computeVolumeByExercise(result.loggedWorkout?.loggedSets);

  return (
    <div className={styles.loggedWorkoutSummary}>
      <h2
        className={styles.loggedWorkoutSummaryPageTitle}
      >
        {result?.loggedWorkout?.workout!.name}
      </h2>
      <p>{result?.loggedWorkout?.date}</p>

      {result.loggedWorkout?.loggedSets.length! < 1 ? (
        <>
          <p>You have not yet recorded any sets for this workout.</p>
          <p>Select an exercise from the menu on the left to get started.</p>
        </>
      ) : (
        <>
          <h3 className="heading-4">Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Total Sets</th>
                <th>Total Volume</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(volumeByExercise).map((exercise) => (
                <tr key={exercise.name}>
                  <td>{exercise.name}</td>
                  <td>{exercise.totalSets}</td>
                  <td>{exercise.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default LoggedWorkoutSummary;
