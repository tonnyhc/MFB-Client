import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
  const [isMoreClicked, setIsMoreClicked] = useState(false);

  function onMoreClick() {
    setIsMoreClicked((oldState) => !oldState);
  }

  const context = {
    onMoreClick,
    isMoreClicked,
  };

  return (
    <UtilityContext.Provider value={context}>
      {children}
    </UtilityContext.Provider>
  );
};
