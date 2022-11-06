import { Box, Container, Typography } from "@mui/material";
import { images } from "../constants";

const ParticipationReasonItem = ({ imagePath, name, description }) => {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      padding: "66px 33px",
      width: "40%",
      background: "#F8F9FD",
      borderRadius: "20px",
      marginBottom: "40px",
    }}>
      <Box>
        <img src={imagePath} alt="" />
      </Box>
      <Box>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Container>
  );
};

const ParticipationReason = () => {
  return (
    <Container sx={{ maxWidth: "100%", padding: "90px 160px" }}>
      <Typography align="center" variant="h4">
        Why Participate in{" "}
        <span style={{ color: "#44924C" }}>AI Challenges?</span>
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "70px",
        }}
      >
        <ParticipationReasonItem
          name="Prove your skills"
          description={
            "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
          }
          imagePath={images.NoteBook}
        />
        <ParticipationReasonItem
          name="Learn from community"
          description={
            "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
          }
          imagePath={images.Community}
        />
        <ParticipationReasonItem
          name="Challenge yourself"
          description={
            "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
          }
          imagePath={images.Robot}
        />
        <ParticipationReasonItem
          name="Earn recognition"
          description={
            "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards."
          }
          imagePath={images.IdentificationCard}
        />
      </Container>
    </Container>
  );
};

export default ParticipationReason;
