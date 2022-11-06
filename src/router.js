import { Routes, Route } from "react-router-dom";
import ChallengeDetails from "./components/challenge.details";
import ChallengeList from "./components/challenges-list";
import EditChallenge from "./components/edit-challenge";
import NewChallenge from "./components/new-challenge";

const routes = [
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
];

const Router = () => {
  return (
    <Routes>
      {routes.map((item) => (
        <Route key={item.path} path={item.path} element={item.element}></Route>
      ))}
    </Routes>
  );
};

export default Router;
