import { AppBar } from "@mui/material";
import { images } from "../constants";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", padding: '10px 90px' }}>
      <img src={images.Logo} alt="" height={"40px"} width="90px" />
    </AppBar>
  );
};

export default Header;
