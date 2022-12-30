import React from "react";
import { ParsedUrlQuery } from "node:querystring";
import { GetServerSideProps, NextPage } from "next";
import {
  GetAthleteByIdDocument,
  GetAthleteByIdQuery,
  UpdateAndPublishAthleteDocument,
} from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import Form from "../../components/form/form";
import Input from "../../components/form/fields/input";
import styles from "./profile.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ProfileProps {
  result: GetAthleteByIdQuery
};

const Profile: NextPage<ProfileProps> = ({ result }) => {
  const { athlete } = result;

  const stringToNumber = (string: FormDataEntryValue | null): number | null => {
    return string === null ? null : Number.parseInt(string as string);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const queryData: {[key: string]: any} = {};
    const formData = new FormData(event.currentTarget);

    for (const [key, value] of formData.entries()) {
      queryData[key] = key === "height" || key === "weight"
        ? stringToNumber(value)
        : value;
    }

    await request(UpdateAndPublishAthleteDocument, queryData);

  };

  return (
    <Main>
      <div className={styles.profile}>
        <h2>Profile Main</h2>
        <Form
          handleFormSubmit={handleFormSubmit}
        >
          <Input
            name="auth0Id"
            type="hidden"
            inputId="auth0Id"
            initialValue={athlete?.auth0Id}
          />
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
        </Form>
      </div>
    </Main>
  );
};

interface ProfileParams extends ParsedUrlQuery {
  userId: string
};

export const getServerSideProps: GetServerSideProps<ProfileProps> =
  async (context) => {
    const { userId } = context.params as ProfileParams;
    console.log(userId);

    const result = await request(
      GetAthleteByIdDocument,
      { auth0Id: userId },
    );

    return {
      props: {
        result,
      },
    };
  };

export default Profile;
