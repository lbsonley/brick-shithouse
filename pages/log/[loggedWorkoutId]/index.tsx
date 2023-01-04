import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GetLoggedWorkoutByIdDocument,
  GetLoggedWorkoutByIdQuery,
} from "../../../graphql/generated";
import Main from "../../../components/layout/main/main";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import SidebarMenu from "../../../components/layout/sidebar/sidebar-menu";
import { request } from "../../../lib/request";

const WorkoutLog = () => {
  const { query } = useRouter();
  const [result, setResult ] = useState<GetLoggedWorkoutByIdQuery>({});

  useEffect(() => {
    async function fetchLoggedWorkout() {
      const response = await request(GetLoggedWorkoutByIdDocument, {
        loggedWorkoutId: query.loggedWorkoutId,
      });
      setResult(response);
    }

    if (query.loggedWorkoutId) {
        fetchLoggedWorkout();
    }
  }, [query.loggedWorkoutId]);

  function makeSidebarMenuLinks() {
    return result && result.loggedWorkout
      ? result.loggedWorkout!.workout!.exercises.map((exercise) => ({
        href: `/log/${query.loggedWorkoutId}/${exercise.slug}`,
        label: exercise.name,
      }))
      : [];
  }

  return (
    <>
      <Sidebar>
        <SidebarMenu
          menuItems={makeSidebarMenuLinks()}
        />
      </Sidebar>
      <Main>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Main>
    </>
  );
};

export default WorkoutLog;
