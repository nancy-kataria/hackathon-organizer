import Banner from "./banner"
import ParticipationReason from "./participation-reason";
import ExploreChallenges from "./explore-challenges";
import { useEffect } from "react";

const ChallengeList = () => {
  useEffect(()=>{
    const challenges = localStorage.getItem('challenges');
    if(challenges === null){
      localStorage.setItem('challenges', JSON.stringify([]));
    }
  },[])
  return (
    <>
      <Banner />
      <ParticipationReason />
      <ExploreChallenges />
    </>
  );
};

export default ChallengeList;
