import { Box, Button, Container, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../utils";

const statusTagStyle = {
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRadius: "5px",
  marginBottom: "15px",
};

const timerColumnStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const timeLabelStyle = { fontSize: "12px" };

function Timer({ targetTime }) {
  const now = moment(new Date());
  const endTime = moment(targetTime);
  const days = endTime.diff(now, "days");
  const finishDate = moment(now).add(days, "days");
  const hours = endTime.diff(finishDate, "hours");
  const finishHour = moment(finishDate).add(hours, "hours");

  return (
    <Box sx={{ display: "flex", gap: "5px" }}>
      <Box sx={timerColumnStyles}>
        <Typography variant="h6"> {endTime.diff(now, "days")} </Typography>
        <Typography sx={timeLabelStyle}> Days </Typography>
      </Box>
      <Typography variant="h6"> : </Typography>
      <Box sx={timerColumnStyles}>
        <Typography variant="h6">
          {" "}
          {endTime.diff(finishDate, "hours")}{" "}
        </Typography>
        <Typography sx={timeLabelStyle}> Hours </Typography>
      </Box>
      <Typography variant="h6"> : </Typography>
      <Box sx={timerColumnStyles}>
        <Typography variant="h6">
          {" "}
          {endTime.diff(finishHour, "minutes")}{" "}
        </Typography>
        <Typography sx={timeLabelStyle}> Minutes </Typography>
      </Box>
    </Box>
  );
}

function ActiveChallengeContent({ name, endTime }) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          ...statusTagStyle,
          backgroundColor: "rgba(68, 146, 76, 0.24)",
          color: "#44924C",
        }}
      >
        {" "}
        Active{" "}
      </Typography>
      <Typography variant="h6"> {name} </Typography>
      <Typography
        variant="body1"
        sx={{ margin: "10px auto", fontSize: "14px" }}
      >
        {" "}
        Ends in{" "}
      </Typography>
      <Timer targetTime={endTime} />
    </>
  );
}

function PastChallengeContent({ name, endTime }) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          ...statusTagStyle,
          backgroundColor: "rgba(255, 60, 0, 0.170148)",
          color: "#FF3C00",
        }}
      >
        {" "}
        Past{" "}
      </Typography>
      <Typography variant="h6"> {name} </Typography>
      <Typography
        variant="body1"
        sx={{ margin: "10px auto", fontSize: "14px" }}
      >
        {" "}
        Ended on
      </Typography>
      <Typography variant="body1" sx={{fontSize: '18px'}}>
        {" "}
        {moment(endTime).format(`Do MMMM'YY HH:MM A`)}{" "}
      </Typography>
    </>
  );
}

function FutureChallengeContent({ name, startTime }) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          ...statusTagStyle,
          backgroundColor: "rgba(242, 201, 76, 0.25)",
          color: "#666666",
        }}
      >
        {" "}
        Upcoming{" "}
      </Typography>
      <Typography variant="h6"> {name} </Typography>
      <Typography
        variant="body1"
        sx={{ margin: "10px auto", fontSize: "14px" }}
      >
        {" "}
        Starts in{" "}
      </Typography>
      <Timer targetTime={startTime} />
    </>
  );
}

const ChallengeItem = ({ challengeData }) => {
  const { challengeImage, name, startTime, endTime, id } = challengeData;
  const navigate = useNavigate();

  const status = getStatus(startTime, endTime);

  const handleChallengeClick = () => {
    navigate(`challenge-details/${id}`);
  };

  return (
    <Box
      sx={{
        borderRadius: "18px",
        width: "354px",
        backgroundColor: "white",
        marginBottom: "50px",
        cursor: "pointer",
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleChallengeClick}
    >
      <img
        alt="challenge"
        src={challengeImage}
        height="174px"
        width={"100%"}
        style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
      />
      <Box
        sx={{
          padding: "27px 54px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        {status === "Active" && (
          <ActiveChallengeContent name={name} endTime={endTime} />
        )}
        {status === "Past" && (
          <PastChallengeContent name={name} endTime={endTime} />
        )}
        {status === "Upcoming" && (
          <FutureChallengeContent name={name} endTime={endTime} />
        )}
        <Button
          sx={{
            backgroundColor: "#44924C",
            color: "white",
            borderRadius: "10px",
            marginTop: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            "&:hover": {
              backgroundColor: "#44924C",
              color: "white",
            },
          }}
        >
          Participate now
        </Button>
      </Box>
    </Box>
  );
};

const Challenges = ({ filters, appliedFiltersCount, nameSearch }) => {
  const [challengeList, setChallengeList] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("challenges")) || [];
    if (appliedFiltersCount === 0 &&  nameSearch.trim() === '') {
      setChallengeList(list);
    } else if (list.length > 0) {
      const filteredChallenges = list.filter((challenge) => {
        const status = getStatus(challenge.startTime, challenge.endTime);
        return filters[challenge.level] || filters[status] || (nameSearch.trim() !=='' && challenge.name.toLowerCase().includes(nameSearch.trim().toLowerCase()))
      });
      setChallengeList(filteredChallenges);
    }
  }, [appliedFiltersCount, filters, nameSearch]);

  return (
    <Container
      sx={{
        maxWidth: "100% !important",
        backgroundColor: "#003145",
        padding: "75px 130px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {challengeList.map((challenge) => (
        <ChallengeItem key={challenge.id} challengeData={challenge} />
      ))}
    </Container>
  );
};

export default Challenges;
