import { React } from "../deps/react.ts";

import { useAppContext } from "../context/app.tsx";

export const ScriptConsumer = (props: any) => {
  let { testDynamicFn } = useAppContext();

  React.useEffect(() => {
    if (!testDynamicFn) return;

    testDynamicFn();
  }, [testDynamicFn]);

  return (
    <p>OK!</p>
  );
};
