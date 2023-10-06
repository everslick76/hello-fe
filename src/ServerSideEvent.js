import React from "react";
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
  const [result, setResult] = React.useState(false);

  function handleClick(event) {
    publish(event.target.value).then(() => {
      setResult(true);
    });
  }

  function handleClose() {
    setResult(false);
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Save
      </Button>
      <Snackbar open={result} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Success
        </Alert>
      </Snackbar>
    </div>
  );
}
