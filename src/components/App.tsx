import { React } from "../deps/react.ts";

import { AppContextProvider } from "../context/app.tsx";
import { ScriptConsumer } from "./ScriptConsumer.tsx";

const styles = {
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "192px",
    height: "192px",
  },
};

export interface AppProps {
  env: string;
  document: HTMLDocument;
}

export const App = ({ env, document }: React.Props<AppProps>) => {
  let [ loading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    console.log("Start loading...");
    const timerId = setTimeout(() => {
      setLoading(false);
      console.log("Finished loading");
    }, 100);

    return () => {
      //cleanup
      clearTimeout(timerId);
    }
  }, []);

  return (
    <AppContextProvider env={env} document={document}>
      <div className="container">
        <p>
          <img src="assets/img/deno-logo.png" style={styles.logo} />
          <img src="assets/img/react-logo192.png" style={styles.logo} />
        </p>
        {(loading) ? (
          <pre>Loading ...</pre>
        ) : (
          <ScriptConsumer />
        )}
      </div>
    </AppContextProvider>
  );
};
