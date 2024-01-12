import axios from "axios";
import "./App.css";
import { ServerSideEvent } from "./ServerSideEvent";
import SimpleBarChart from "./SimpleBarChart";
import { useEffect, useState } from "react";

export function get() {
  return new Promise((resolve) => {
    axios
      .get("https://hello-app-dhsiets7pq-ey.a.run.app/chart")
      .then((response) => {
        resolve(new Map(Object.entries(response.data)));
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

export function App() {
  const [names, setNames] = useState(new Map());

  function addName(name) {
    setNames(
      (names) => new Map([...names, [name, (names.get(name) ?? 0) + 1]])
    );
  }

  useEffect(() => {
    get().then((data) => setTimeout(() => setNames(data), 3000));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SimpleBarChart names={names} />
        <br></br>
        <ServerSideEvent onEvent={addName} />
      </header>
    </div>
  );
}

export default App;
