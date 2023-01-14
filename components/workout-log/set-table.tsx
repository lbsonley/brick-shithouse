import { LoggedSetFragment } from "../../graphql/generated";
import SetForm from "./set-form";
import styles from "./workout-log.module.scss";

interface SetsTableProps {
  title: string | undefined;
  sets: LoggedSetFragment[] | undefined;
  workoutSlug?: string | null | undefined;
  updateSets?: () => void;
};

const SetTable = ({
  title,
  sets,
  workoutSlug,
  updateSets = () => {},
}: SetsTableProps) => {
  return (
    <div className={styles.setTableContainer}>
      <table className={`${styles.setTable}`}>
        <thead className={styles.setTableHead}>
          <tr>
            <th className={styles.setTableHeadCell} colSpan={3}>
              {title}
            </th>
          </tr>
          <tr>
            <th className={styles.setTableHeadCell}>
              Set #
            </th>
            <th className={styles.setTableHeadCell}>
              Reps
            </th>
            <th className={styles.setTableHeadCell}>
              Weight
            </th>
            <th className={styles.setTableHeadCell}>
            </th>
          </tr>
        </thead>
        <tbody>
          {sets?.map((set, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{set.reps}</td>
              <td>{set.weight}</td>
              <td></td>
            </tr>
          ))}
          {workoutSlug && (
            <SetForm
              workoutSlug={workoutSlug}
              updateSets={updateSets}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SetTable;
