import React, { useEffect, useState, forwardRef } from "react";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export async function publish(name) {
  const response = await fetch(
    `https://hello-app-n3tuxf5gqa-lz.a.run.app/publish?name=${name}`
  );
  return response.json();
}

export function ServerSideEvent({ onEvent }) {
  const [waiting, setWaiting] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState();
  const [name, setName] = useState();

  function handleClick() {
    setWaiting(true);
    publish(name).then((data) => {
      console.log(data);
      setMessage("Saved");
      setAlert(true);
      setWaiting(false);
    });
  }

  function handleInput(event) {
    var valid = event.target.value !== "";
    setName(event.target.value);
    setValid(valid);
    setDisabled(!valid);
  }

  function handleClose() {
    setAlert(false);
  }

  function handleServerSideEvent(data) {
    onEvent(data);
    setMessage(`${data} has published something new`);
    setAlert(true);
  }

  useEffect(() => {
    const eventSource = new EventSource(
      "https://hello-pubsub-n3tuxf5gqa-lz.a.run.app/events?stream=messages"
    );
    eventSource.onmessage = (e) => handleServerSideEvent(e.data);
    return () => {
      eventSource.close();
    };
  }, []);

  function renderTextField() {
    return valid ? (
      <TextField
        id="outlined-basic"
        label="Your name"
        variant="outlined"
        disabled={waiting}
        onChange={handleInput}
      />
    ) : (
      <TextField
        error
        id="outlined-error"
        label="Your name"
        variant="outlined"
        disabled={waiting}
        onChange={handleInput}
      />
    );
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            Enter <b>your name</b> and press <b>Save</b>
          </Typography>
        </CardContent>
        <CardContent>{renderTextField()}</CardContent>
        <CardActions>
          <Badge
            badgeContent={<CircularProgress size={20} />}
            invisible={!waiting}
          >
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={disabled || waiting}
            >
              Save
            </Button>
          </Badge>
        </CardActions>
      </Card>
      <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
