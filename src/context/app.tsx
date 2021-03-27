import { React } from "../deps/react.ts";

export interface AppContextProps {
  env: string;
  testDynamicFn: any;
}

export const AppContext = React.createContext<AppContextProps | undefined>(undefined);

export interface AppContextProviderProps {
  env: string;
  document: HTMLDocument;
}

/**
 * env and other config parameters can be queried from backend in more advanced use cases 
 * @param props
 */
export const AppContextProvider = ({
  env,
  document,
  children,
}: React.PropsWithChildren<AppContextProviderProps>) => {
  const scriptContainerRef = React.useRef<any>(undefined);

  let [testDynamicFn, setTestDynamicFn] = React.useState<any>(undefined);

  const setScriptContainerRef = React.useCallback((containerNode: HTMLElement) => {
    scriptContainerRef.current = containerNode;
    
    if (!containerNode) return;
    if (!document) return;

    const scriptNode: HTMLScriptElement = document.createElement("script");
    switch (env) {
      case "dev":
        scriptNode!.src = "/assets/js/dev.js";
        break;
      case "prd":
        scriptNode!.src = "/assets/js/prd.js";
        break;
      default:
        throw new Error(`unknown env: ${env}`);
    }
    scriptNode.onload = (evt: any) => {
      console.log("script loaded:", evt.currentTarget);
      setTestDynamicFn((globalThis as any).testDynamicFn);
    };
    containerNode.appendChild(scriptNode);

    return () => {
      // Cleanup
      console.log("cleaning up script loader");
      (scriptContainerRef.current) && (scriptNode)
         && (scriptContainerRef.current.removeChild(scriptNode));
    }
  }, [document, scriptContainerRef, env]);

  return (
    <AppContext.Provider value={{ env, testDynamicFn }} >
      <div ref={setScriptContainerRef}></div>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("No AppContext Provider available");
  }

  return context
}
