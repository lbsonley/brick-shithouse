import { LoggedSetFragment } from "../../graphql/generated";

export const computeVolumeByExercise = (
  loggedSets: LoggedSetFragment[] | undefined,
) => {
  const setsByExercise: {[key: string]: {
    name: string,
    volume: number,
    totalSets: number
  }} = {};

  for (const set of loggedSets!) {
    setsByExercise[set!.exercise!.name] = setsByExercise[set!.exercise!.name]
      || {
        name: set!.exercise!.name,
        volume: 0,
        totalSets: 0,
      };

    setsByExercise[set!.exercise!.name] = {
      ...setsByExercise[set!.exercise!.name],
      volume: (
        setsByExercise[set!.exercise!.name].volume + (set.reps * set.weight)
      ),
      totalSets: setsByExercise[set!.exercise!.name].totalSets + 1,
    };
  }

  return setsByExercise;
};
