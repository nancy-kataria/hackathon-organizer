import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import ChallengeForm from "./challenge-form";

const EditChallenge = () => {
  const { challengeId } = useParams();

  const [challengeDetails, setChallengeDetails] = useState();

  useEffect(() => {
    const challenges = JSON.parse(localStorage.getItem("challenges")) || [];
    if (challengeId) {
      const challenge = challenges.find(
        (challenge) => challenge.id === challengeId
      );
      setChallengeDetails(challenge);
    }
  }, [challengeId]);

  if (!challengeDetails) return null;

  return <ChallengeForm editMode={true} challengeDetails={challengeDetails}  />;
};

export default EditChallenge;
