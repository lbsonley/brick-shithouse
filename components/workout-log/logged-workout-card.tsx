import { LoggedWorkoutFragment } from "../../graphql/generated";
import { computeVolumeByWorkout } from "../../lib/utils/workout-utils";
import Card from "../base/card/card";

interface LoggedWorkoutCardProps {
  loggedWorkout: LoggedWorkoutFragment;
}

const LoggedWorkoutCard = ({ loggedWorkout }: LoggedWorkoutCardProps) => {
  const {
    id,
    date,
    workout,
    loggedSets,
  } = loggedWorkout;

  const totalWork = computeVolumeByWorkout(loggedSets);

  return (
    <Card href={`/workout-log/${id}`}>
      <>
        <p>
          {date} {workout!.name}
        </p>
        <p>
          Total Sets: {totalWork.totalSets}
        </p>
        <p>
          Total Volume: {totalWork.totalVolume}
        </p>
      </>
    </Card>
  );
};

export default LoggedWorkoutCard;
