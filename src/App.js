import "./App.css";
import { ServerSideEvent } from "./ServerSideEvent";
import SimpleBarChart from "./SimpleBarChart";
import { useState } from "react";

export function App() {
  const [names, setNames] = useState(new Map());

  function addName(name) {
    const count = (names.get(name) ?? 0) + 1;
    setNames(new Map(names.set(name, count)));
  }

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
