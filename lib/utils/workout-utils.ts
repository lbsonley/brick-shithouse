import { LoggedSetFragment } from "../../graphql/generated";

export interface VolumeByWorkout {
  totalVolume: number;
  totalSets: number;
}

export const computeVolumeByWorkout = (
  loggedSets: LoggedSetFragment[] | undefined,
): VolumeByWorkout => {
  let totalVolume = 0;
  let totalSets = 0;

  for (const set of loggedSets!) {
    totalVolume += set.reps * set.weight;
    totalSets += 1;
  }

  return {
    totalVolume,
    totalSets,
  };
};

export interface VolumeByExercise {
  [key: string]: {
    name: string,
    volume: number,
    totalSets: number
  }
};

export const computeVolumeByExercise = (
  loggedSets: LoggedSetFragment[] | undefined,
) => {
  const setsByExercise: VolumeByExercise = {};

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
