import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    fontFamily: "Quicksand",
    fontSize: 60,
  },
});

function CreateNote() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("reminders");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const navigate = useNavigate();
  // handleSubmit
  const handleSubmit = async e => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (!title) {
      setTitleError(true);
    }
    if (!details) {
      setDetailsError(true);
    }
    if (title && details) {
      try {
        await fetch("http://localhost:8080/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, details, category }),
        });
        navigate("/notes");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container>
      <Typography
        className={classes.title}
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          style={{ marginTop: 20, marginBottom: 20, display: "block" }}
          label='Note Title'
          variant='outlined'
          required
          fullWidth
          error={titleError}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          style={{ marginTop: 20, marginBottom: 20, display: "block" }}
          label='Details'
          variant='outlined'
          multiline
          rows={4}
          required
          fullWidth
          error={detailsError}
          onChange={e => setDetails(e.target.value)}
        />
        <FormControl
          style={{ marginTop: 20, marginBottom: 20, display: "block" }}
        >
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <FormControlLabel
              value='reminders'
              control={<Radio />}
              label='Reminders'
            />
            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
            <FormControlLabel value='work' control={<Radio />} label='Work' />
          </RadioGroup>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default CreateNote;
