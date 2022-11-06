import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { images } from "../constants";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { Upload } from "upload-js";
import Loader from "./loader";

const labelStyle = {
  marginBottom: "20px",
};

const levels = [
  {
    label: "Easy",
    value: "Easy",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Difficult",
    value: "Difficult",
  },
];

const ChallengeForm = ({ editMode = false, challengeDetails = undefined }) => {
  const [challengeName, setChallengeName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [description, setDescription] = useState("");
  const [challengeImage, setChallengeImage] = useState("");
  const [level, setLevel] = useState("Easy");
  const [loader, setLoader] = useState({
    show: false,
    message: "",
  });

  const navigate = useNavigate();

  const hiddenFileInput = useRef(null);

  const handleUploadImageClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (editMode) {
      setChallengeName(challengeDetails.name);
      setStartTime(challengeDetails.startTime);
      setEndTime(challengeDetails.endTime);
      setDescription(challengeDetails.description);
      setChallengeImage(challengeDetails.challengeImage);
      setLevel(challengeDetails.level);
    }
  }, [editMode, challengeDetails]);

  const [error, setError] = useState({
    challenge: false,
    startTime: false,
    endTime: false,
    description: false,
    challengeImage: false,
    endDateBeforeStart: false,
  });

  const validateForm = () => {
    let hasError = false;

    const formError = { ...error };

    if (challengeName.trim() === "") {
      formError.challenge = true;
      hasError = true;
    }
    if (!startTime) {
      formError.startTime = true;
      hasError = true;
    }
    if (!endTime) {
      // end time cannot be before start time
      formError.endTime = true;
      hasError = true;
    }

    if (endTime && startTime && moment(endTime).isBefore(startTime)) {
      formError.endDateBeforeStart = true;
      hasError = true;
    }

    if (description.trim() === "") {
      formError.description = true;
      hasError = true;
    }
    if (challengeImage.trim() === "") {
      formError.challengeImage = true;
      hasError = true;
    }

    setError(formError);

    if(hasError) alert('Found issues with the form. Please check the values carefully.');

    return !hasError;
  };

  const createNewChallenge = () => {
    const challenges = JSON.parse(localStorage.getItem("challenges")) || [];
    challenges.push({
      id: uuid(),
      name: challengeName,
      startTime,
      endTime,
      description,
      challengeImage,
      level,
    });

    challenges.sort(
      (a, b) => new moment(b.startTime) - new moment(a.startTime)
    );

    localStorage.setItem("challenges", JSON.stringify(challenges));

    alert("New challenge created successfully.");

    navigate("/");
  };

  const updateExistingChallenge = () => {
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    const index = challenges.findIndex(challenge=>challenge.id === challengeDetails.id);
    challenges[index] = {
      id: challengeDetails.id,
      name: challengeName,
      startTime,
      endTime,
      description,
      challengeImage,
      level,
    };

    challenges.sort(
      (a, b) => new moment(b.startTime) - new moment(a.startTime)
    );

    localStorage.setItem("challenges", JSON.stringify(challenges));

    alert("Challenge saved successfully.");

    navigate("/");
  };

  const handleUploadImage = async (e) => {
    const fileUploaded = e.target.files[0];
    if (fileUploaded) {
      setLoader({
        message: "Uploading image",
        show: true,
      });
      try {
        const upload = Upload({
          apiKey: "public_W142hWe2niwgEPEha8LVHv2LjR5Y",
        });

        const result = await upload.uploadFile(fileUploaded);
        const { fileUrl } = result;
        setChallengeImage(fileUrl);
      } catch (error) {
        alert("Failed to upload image");
      }
      setLoader({
        message: "",
        show: false,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validForm = validateForm();
    if (validForm) {
      if (editMode) {
        updateExistingChallenge();
      } else {
        createNewChallenge();
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box
          sx={{
            maxWidth: "100% !important",
            padding: "40px 90px",
            backgroundColor: "#F8F9FD",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Challenge Details
          </Typography>
        </Box>
        <Stack
          spacing={4}
          sx={{
            padding: "30px 90px",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "450px" }}
          >
            <label style={labelStyle}>Challenge Name</label>
            <TextField
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
            ></TextField>
            {error.challenge && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                Field required
              </span>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "450px" }}
          >
            <label style={labelStyle}>Start Time</label>
            <DateTimePicker
              label="Add start date"
              value={startTime}
              onChange={(date) => {
                setStartTime(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            {error.startTime && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                Field required
              </span>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "450px" }}
          >
            <label style={labelStyle}>End Time</label>
            <DateTimePicker
              label="Add end date"
              value={endTime}
              onChange={(date) => {
                setEndTime(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            {error.endTime && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                Field required
              </span>
            )}
            {error.endDateBeforeStart && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                End Date cannot be before start date
              </span>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Description</label>
            <TextareaAutosize
              aria-label="empty textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Identify the class to which each butterfly belongs to"
              style={{ width: "800px", height: "250px" }}
            />
            {error.description && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                Field required
              </span>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Image</label>
            {!challengeImage ? (
              <Button
                sx={{
                  width: "100px",
                  height: "20px",
                  padding: "20px 100px",
                  border: "1px solid #D9D9D9",
                  backgroundColor: "#F4F4F4",
                  borderRadius: "5px",
                  display: "flex",
                  gap: "5px",
                  color: "#666666",
                }}
                onClick={handleUploadImageClick}
              >
                <span>Upload</span>
                <img src={images.uploadImage} alt="upload" />
              </Button>
            ) : (
              <Box
                sx={{
                  padding: "22px 0px 29px 21px",
                  backgroundColor: "#F8F9FD",
                  width: "300px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={challengeImage}
                  alt="Challenge banner"
                  style={{
                    height: "120px",
                    width: "250px",
                    borderRadius: "15px",
                    marginBottom: "27px",
                  }}
                />
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#44924C",
                  }}
                  onClick={handleUploadImageClick}
                >
                  <img src={images.ImageFill} alt="" /> Change image{" "}
                  <img src={images.RightArrow} alt="" />
                </Typography>
              </Box>
            )}
            <input
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleUploadImage}
              hidden
            />
            {error.challengeImage && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                Image required
              </span>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Level type</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
              }}
              sx={{ width: "150px" }}
            >
              {levels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "200px", backgroundColor: "#44924C" }}
          >
            {editMode ? "Save" : "Create"} Challenge
          </Button>
        </Stack>
        {loader.show && <Loader message={loader.message} />}
      </LocalizationProvider>
    </form>
  );
};

export default ChallengeForm;
