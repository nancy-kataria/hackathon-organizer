import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { images } from "../constants";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../utils";

function getTimeLabel(startTime, endTime) {
  const status = getStatus(startTime, endTime);
  const timezone = momentTimezone.tz.guess();
  if (status === "Active") {
    return `Ends on ${moment(endTime).format(`Do MMM'YY HH:MM A`)} ${timezone}`;
  } else if (status === "Past") {
    return `Ended on ${moment(endTime).format(
      `Do MMM'YY HH:MM A`
    )} ${timezone}`;
  }
  return `Starts on ${moment(startTime).format(
    `Do MMM'YY HH:MM A`
  )} ${timezone}`;
}

const ChallengeDetails = () => {
  const { challengeId } = useParams();

  const [challengeDetails, setChallengeDetails] = useState();
  const navigate = useNavigate();

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#003145",
          padding: "95px 130px",
        }}
      >
        <Typography
          sx={{
            backgroundColor: "#FFCE5C",
            display: "inline-block",
            padding: "5px 47px 5px 22px",
            borderRadius: "5px",
            marginBottom: "25px",
          }}
        >
          {" "}
          <img
            src={images.TimeIcon}
            alt="time"
            style={{ position: "relative", top: "2px", marginRight: "5px" }}
          />{" "}
          {getTimeLabel(challengeDetails.startTime, challengeDetails.endTime)}
        </Typography>
        <Typography variant="h3" sx={{ color: "white", marginBottom: "35px" }}>
          {challengeDetails.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "white", marginBottom: "24px" }}>
          Identify the class to which each butterfly belongs to
        </Typography>
        <Button
          sx={{
            backgroundColor: "white",
            color: "#003145",
            display: "flex",
            gap: "10px",
            textTransform: "capitalize",
            fontWeight: "600",
            alignItems: "center",
            paddingLeft: "21px",
            paddingRight: "21px",
          }}
        >
          <img src={images.SkillLevel} alt="skill level" />{" "}
          {challengeDetails.level}
        </Button>
      </Box>
      <Box
        sx={{
          paddingLeft: "130px",
          paddingRight: "130px",
          display: "flex",
          border: "0.3px solid #DDE6ED",
          boxShadow: "0px 6px 12px #DDE6ED",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            borderBottom: "4px solid #44924C",
            display: "inline-block",
            paddingBottom: "10px",
            alignSelf: "flex-end",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          Overview
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            marginTop: "15px",
            marginBottom: "15px",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/edit-challenge/${challengeId}`)}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          paddingTop: "46px",
          paddingLeft: "130px",
          width: "70%",
          color: "#64607D",
        }}
      >
        <Typography sx={{ fontWeight: "500", lineHeight: "28px" }}>
          {challengeDetails.description}
        </Typography>
      </Box>
    </>
  );
};

export default ChallengeDetails;
