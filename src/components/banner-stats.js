import { Box, Container, Typography } from "@mui/material";
import { images } from "../constants";

const BannerStatsItem = ({count, name, imagePath}) => {
  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{ display: "flex", pr: 3}}>
        <img src={imagePath} alt="" />
      </Box>
      <Box sx={{ display: "flex", flexDirection: 'column', color: 'white' }}>
        <Typography variant="h5">{count}</Typography>
        <span style={{fontSize: '16px'}} >{name}</span>
      </Box>
    </Box>
  );
};

const BannerStats = () => {
  return (
    <Container
      sx={{
        maxWidth: "100% !important",
        backgroundColor: "#002A3B",
        height: "200px",
        margin: "0 !important",
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: '180px !important',
        paddingRight: '180px !important',
      }}
    >
        <BannerStatsItem name="AI model submissions" count={'100K+'} imagePath={images.AIModel} />
        <BannerStatsItem name="Data Scientists" count={'50K+'} imagePath={images.DataScientists} />
        <BannerStatsItem name="AI Challenges hosted" count={'100+'} imagePath={images.AIChallenges} />
    </Container>
  );
};

export default BannerStats;
