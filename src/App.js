import axios from "axios";
import "./App.css";
import { ServerSideEvent } from "./ServerSideEvent";
import SimpleBarChart from "./SimpleBarChart";
import { useEffect, useState } from "react";

export async function get() {
  axios
    .get("https://hello-app-n3tuxf5gqa-lz.a.run.app/chart")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
}

export function App() {
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState(new Map());

  function addName(name) {
    const count = (names.get(name) ?? 0) + 1;
    setNames(new Map(names.set(name, count)));
  }

  function handleNames(names) {
    console.log(names);
    setNames(names);
    setLoading(false);
  }

  useEffect(() => {
    get()
      .then(setLoading(true))
      .then((names) => setTimeout(() => handleNames(names), 3000));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!loading && <SimpleBarChart names={names} />}
        <br></br>
        <ServerSideEvent onEvent={addName} />
      </header>
    </div>
  );
}

export default App;
