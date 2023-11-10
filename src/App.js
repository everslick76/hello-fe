import axios from "axios";
import "./App.css";
import { ServerSideEvent } from "./ServerSideEvent";
import SimpleBarChart from "./SimpleBarChart";
import { useEffect, useState } from "react";

export function get() {
  return new Promise((resolve) => {
    axios
    .get("https://hello-app-n3tuxf5gqa-lz.a.run.app/chart")
    .then((response) => {
      const map = new Map(Object.entries(response.data));
      resolve(map);
    })
    .catch((err) => {
      console.error(err);
    });
  })
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
    setLoading(true)
    get()
      .then((a) => setTimeout(() => handleNames(a), 3000));
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
