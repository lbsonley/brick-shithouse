import { useEffect, useState } from "react";
import {
  GetExercisesDocument,
  GetExercisesQuery,
} from "../../graphql/generated";
import { request } from "../../lib/request";
import Main from "../../components/layout/main/main";
import styles from "./exercises.module.scss";
import { NextPage } from "next";

const Exercises: NextPage = () => {
  const [
    result,
    setResult,
  ] = useState<GetExercisesQuery>({} as GetExercisesQuery);
  const { exercises } = result;

  useEffect(() => {
    async function fetchExercises() {
      const response = await request(
        GetExercisesDocument,
        {
          first: 20,
          skip: 0,
        },
      );
      setResult(response);
    }

    fetchExercises();
  }, []);

  return (
    <>
      <Main>
        <h2 className="heading-3">Exercises</h2>
        <ul className={styles.exerciseList}>
          {exercises && exercises.map(({id, name}) => (
            <li
              className={styles.exerciseListItem}
              key={id}
            >
                {name}
            </li>
          ))}
        </ul>
      </Main>
    </>
  );
};

export default Exercises;
