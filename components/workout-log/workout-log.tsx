import styles from "./workout-log.module.scss";

const WorkoutLog = () => {
  return (
    <div className={styles.workoutLog}>
      <div className={styles.workoutLogSidebar}>
        Sidebar
      </div>
      <div className={styles.workoutLogMain}>
        Main
      </div>
    </div>
  );
};

export default WorkoutLog;
