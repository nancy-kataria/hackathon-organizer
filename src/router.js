import { createBrowserRouter } from "react-router-dom";
import ChallengeDetails from "./components/challenge.details";
import ChallengeList from "./components/challenges-list";
import EditChallenge from "./components/edit-challenge";
import NewChallenge from "./components/new-challenge";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ChallengeList />,
  },
  {
    path: "/new-challenge",
    element: <NewChallenge />,
  },
  {
    path: "/challenge-details/:challengeId",
    element: <ChallengeDetails />,
  },
  {
    path: "/edit-challenge/:challengeId",
    element: <EditChallenge />,
  },
]);

export default routes;
