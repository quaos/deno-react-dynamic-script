import { React, ReactDOM } from "./deps/react.ts";

import { App } from "./components/App.tsx";

window.addEventListener("DOMContentLoaded", (evt) => {
  const params = new URLSearchParams(window.location.search);
  let env = params.get("env");
  if (!env) {
    console.warn("no env specified in query string, using default.");
    env = "dev";
  }
  
  ReactDOM.render(
    <App env={env} document={document} />,
    // @ts-ignore
    document.getElementById("root"),
  );
});

export {};
