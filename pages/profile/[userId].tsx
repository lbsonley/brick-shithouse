import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  GetAthleteByIdDocument,
  GetAthleteByIdQuery,
  PublishAthleteDocument,
  UpdateAthleteDocument,
  WeightUnit,
} from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import Form from "../../components/form/form";
import Input from "../../components/form/fields/input";
import Select from "../../components/form/fields/select";
import Button from "../../components/base/button/button";
import styles from "./profile.module.scss";

const Profile: NextPage = () => {
  const router = useRouter();
  const [result, setResult] = useState<GetAthleteByIdQuery>({});
  const { athlete } = result;

  useEffect(() => {
    async function fetchAthlete () {
      const result: GetAthleteByIdQuery = await request(
        GetAthleteByIdDocument,
        { auth0Id: router.query.userId },
      );
      setResult(result);

    }

    if (router.query.userId) {
      fetchAthlete();
    }
  }, [router.query.userId]);

  const enumToSelectOptionArray = (
    enumToConvert: { [key: string]: string },
  ) => {
      return Object.values(enumToConvert).map((value) => {
        return {
          label: value.toUpperCase(),
          value,
        };
      });
  };

  const options = enumToSelectOptionArray(WeightUnit);
  options.unshift({ label: "-- Select a Weight Unit --", value: "" });

  const formDataEntryValueToNumber = (
    string: FormDataEntryValue | null,
  ): number | null => {
    return string === null ? null : Number.parseInt(string as string);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const queryData: {[key: string]: any} = {};
    const formData = new FormData(event.currentTarget);


    for (const [key, value] of formData.entries()) {
      queryData[key] = key === "height" || key === "weight"
      ? formDataEntryValueToNumber(value)
      : value;
    }

    await request(UpdateAthleteDocument, queryData);
    await request(PublishAthleteDocument, { auth0Id: queryData.auth0Id });

  };

  return (
    <Main>
      <div className={styles.profile}>
        <h2 className="heading-3">Edit Profile</h2>
        {athlete && (
          <Form
            handleFormSubmit={handleFormSubmit}
          >
            <Input
              name="auth0Id"
              type="hidden"
              inputId="auth0Id"
              initialValue={athlete?.auth0Id}
            />
            <div className={`${styles.inputGrid}`}>
              <Input
                label="Username"
                name="username"
                inputId="username"
                initialValue={athlete?.username}
                required={true}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                inputId="email"
                initialValue={athlete?.email}
                required={true}
              />
              <Input
                label="Height"
                name="height"
                inputId="height"
                initialValue={athlete?.height || ""}
              />
              <Input
                label="Weight"
                name="weight"
                inputId="weight"
                initialValue={athlete?.weight || ""}
              />
              <Select
                inputId="preferredWeightUnit"
                name="preferredWeightUnit"
                options={options}
                label="Preferred Weight Unit"
                initialValue={athlete?.preferredWeightUnit || ""}
              />

              <Button
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Main>
  );
};

export default Profile;
