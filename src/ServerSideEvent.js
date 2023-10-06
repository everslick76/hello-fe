import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function publish() {
  const url = new URL("https://hello-app-n3tuxf5gqa-lz.a.run.app/publish");
  return fetch(url).then((response) => response.json());
}

export function ServerSideEvent() {
  const [result, setResult] = React.useState(false);

  const handleClick = (event) => {
    publish(event.target.value).then(() => {
      setResult(true);
    });
  };

  const handleClose = () => {
    setResult(false);
  };

  return (
    <div className="App">
      <div>
        <Button variant="contained" onClick={handleClick}>
          Save
        </Button>
        <Snackbar open={result} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
