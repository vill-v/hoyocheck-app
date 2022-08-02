import React from "react";

export const mainContext = React.createContext({
  accounts: null,
  setAccounts: () => 0,
  activeAccount: null,
  setActiveAccount: () => 0,
  lastResult: null,
  setLastResult: () => 0,
});
