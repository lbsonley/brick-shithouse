"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Main from "../components/layout/main/main";

const Home = () => {
  const auth = useUser();

  return (
    <Main isFullWidth={true}>
      <h1 className="heading-1">Home</h1>
    </Main>
  );
};

export default Home;
