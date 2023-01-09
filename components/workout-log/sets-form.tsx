import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FaPlusSquare } from "react-icons/fa";
import {
  RepsWeightExerciseNameFragment,
  CreateLoggedSetDocument,
} from "../../graphql/generated";
import { request } from "../../lib/request";
import Input from "../form/fields/input";
import Button from "../../components/base/button/button";
import styles from "./sets-form.module.scss";
import { formatDateString } from "../../lib/utils";

interface SetsFormProps {
  sets: RepsWeightExerciseNameFragment[] | undefined;
  workoutSlug: string | null | undefined;
  updateSets: () => void;
};

const SetsForm = ({ sets, workoutSlug, updateSets }: SetsFormProps) => {
  const { query } = useRouter();
  const { user } = useUser();
  const [isSetValid, setIsSetValid] = useState<boolean>(false);
  const [ setData, updateSetData ] = useState({
    reps: "",
    weight: "",
  });

  useEffect(() => {
    const isValid = (Boolean(setData.reps) && Boolean(setData.weight));
    setIsSetValid(isValid);
  }, [setData]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const changedName = currentTarget.getAttribute("name");
    updateSetData({
      ...setData,
      [(changedName as string)]: currentTarget.value,
    });
  };

  const handleAddSet = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("should post new set to backend and then refetch sets");
    const response = await request(CreateLoggedSetDocument, {
      athleteAuth0Id: user!.sub,
      loggedWorkoutId: query.loggedWorkoutId,
      workoutSlug: workoutSlug,
      exerciseSlug: query.exerciseSlug,
      date: formatDateString(new Date()),
      reps: Number.parseInt(setData.reps, 10),
      weight: Number.parseInt(setData.weight, 10),
      weightUnit: "kg",
    });

    updateSets();

    updateSetData({
      reps: "",
      weight: "",
    });
  };

  return (
    <>
      {sets && sets.map(({id, reps, weight}) => (
        <div key={id} className={`${styles.setsForm} grid-container`}>
          <div className="column-5">
            <Input
              label="Reps"
              placeholder="Reps"
              inputId={`reps-${id}`}
              name={`reps-${id}`}
              initialValue={reps}
            />
          </div>
          <div className="column-5">
            <Input
              label="Weight"
              placeholder="Weight"
              inputId={`weight-${id}`}
              name={`weight-${id}`}
              initialValue={weight}
            />
          </div>
        </div>
      ))}
      <div className={`${styles.setsForm} grid-container`}>
        <div className="column-5">
          <Input
            label="Reps"
            placeholder="Reps"
            inputId="reps"
            name="reps"
            initialValue={setData.reps}
            parentHandleChange={handleOnChange}
          />
        </div>
        <div className="column-5">
          <Input
            label="Weight"
            placeholder="Weight"
            inputId="weight"
            name="weight"
            initialValue={setData.weight}
            parentHandleChange={handleOnChange}
          />
        </div>
        <div className="column-2">
          <Button
            type="button"
            disabled={!isSetValid}
            handleClick={handleAddSet}
          >
            <FaPlusSquare/>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SetsForm;
