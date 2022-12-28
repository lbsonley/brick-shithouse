import { ParsedUrlQuery } from "node:querystring";
import { GetServerSideProps, NextPage } from "next";
import { GetUserByIdDocument, GetUserByIdQuery } from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import styles from "./profile.module.scss";

interface ProfileProps {
  result: GetUserByIdQuery
};

const Profile: NextPage<ProfileProps> = ({ result }) => {

  return (
    <Main>
      <div className={styles.profile}>
        <h2>Profile Main</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
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

    const result = await request(GetUserByIdDocument, { userId });

    return {
      props: {
        result,
      },
    };
  };

export default Profile;
