import { Button, Container, Typography, Box } from "@mui/material";
import BannerStats from "./banner-stats";
import { useNavigate } from "react-router-dom";
import Images, { images } from '../constants'

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container
        sx={{
          maxWidth: "100vw !important",
          backgroundColor: "#003145",
          height: "600px",
          margin: "0",
          padding: "144px !important",
          display: 'flex'
        }}
      >
        <Container>
          <Container
            width={"60%"}
            sx={{ borderLeft: "10px solid #FFCE5C", paddingLeft: "50px" }}
          >
            <Typography
              variant="h2"
              color={"white"}
              sx={{
                fontWeight: "400",
              }}
            >
              Accelerate Innovation
            </Typography>
            <Typography
              variant="h2"
              color={"white"}
              sx={{
                fontWeight: "500",
                marginBottom: "40px",
              }}
            >
              with Global AI Challenges
            </Typography>
          </Container>
          <Container
            width={"60%"}
            sx={{ paddingLeft: "40px !important", width: "500px", margin: "0" }}
          >
            <Typography variant="body1" color={"white"}>
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to test on diverse
              datasets allowing you to foster learning through competitions.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#003145",
                marginTop: "40px",
              }}
              onClick={()=>navigate('/new-challenge')}
            >
              Create Challenge
            </Button>
          </Container>
        </Container>
        <Box>
          <img src={images.Rocket} />
        </Box>
      </Container>
     <BannerStats />
    </>
  );
};

export default Banner;
