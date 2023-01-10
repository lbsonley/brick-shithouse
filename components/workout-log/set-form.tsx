import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FaPlusSquare } from "react-icons/fa";
import { CreateLoggedSetDocument } from "../../graphql/generated";
import { request } from "../../lib/request";
import Input from "../form/fields/input";
import Button from "../base/button/button";
import { formatDateString } from "../../lib/utils";

interface SetsFormProps {
  workoutSlug: string | null | undefined;
  updateSets: () => void;
};

const SetForm = ({ workoutSlug, updateSets }: SetsFormProps) => {
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
      <tr>
        <td></td>
        <td>
          <Input
            label="Reps"
            placeholder="Reps"
            inputId="reps"
            name="reps"
            initialValue={setData.reps}
            parentHandleChange={handleOnChange}
            hiddenLabel={true}
          />
        </td>
        <td>
          <Input
            label="Weight"
            placeholder="Weight"
            inputId="weight"
            name="weight"
            initialValue={setData.weight}
            parentHandleChange={handleOnChange}
            hiddenLabel={true}
          />
        </td>
        <td>
          <Button
            type="button"
            size="small"
            disabled={!isSetValid}
            handleClick={handleAddSet}
          >
            <FaPlusSquare/>
          </Button>
        </td>
      </tr>
    </>
  );
};

export default SetForm;
