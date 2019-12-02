import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  // eslint-disable-next-line
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    if (!replace) {
      setMode(mode);
      history.push(mode);
    }
    history.pop();
    history.push(mode);
    setMode(mode);
  }

  function back() {
    if (mode !== initial) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
