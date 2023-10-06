import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export async function publish() {
  const response = await fetch(
    "https://hello-app-n3tuxf5gqa-lz.a.run.app/publish"
  );
  return response.json();
}

export function ServerSideEvent() {
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState();

  function handleClick(event) {
    publish(event.target.value).then((data) => {
      console.log(data);
      setMessage("Saved");
      setAlert(true);
    });
  }

  function handleClose() {
    setAlert(false);
  }

  function handleServerSideEvent(data) {
    console.log(data);
    setMessage("Published");
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

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Save
      </Button>
      <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
