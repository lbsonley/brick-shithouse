import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/router";
import { request } from "../../../lib/request";
import {
  GetLoggedWorkoutByIdDocument,
  GetLoggedWorkoutByIdQuery,
} from "../../../graphql/generated";
import Main from "../../../components/layout/main/main";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import SidebarMenu from "../../../components/layout/sidebar/sidebar-menu";
import LoggedWorkoutSummary
  from "../../../components/workout-log/logged-workout-summary";
import Loading from "../../../components/base/loading";

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
        href: `/workout-log/${query.loggedWorkoutId}/${exercise.slug}`,
        label: exercise.name,
      }))
      : [];
  }

  return (
    <Suspense fallback={<Loading />}>
      <>
        <Sidebar>
          <SidebarMenu
            menuItems={makeSidebarMenuLinks()}
          />
        </Sidebar>
        <Main>
          <LoggedWorkoutSummary
            result={result}
          />
        </Main>
      </>
    </Suspense>
  );
};

export default WorkoutLog;
