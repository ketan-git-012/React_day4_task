import { createContext } from "react";

const CustomeSnack = createContext();

const CustomSpinner = createContext({
  loading: false,
  setLoading: () => {},
});

export { CustomeSnack, CustomSpinner };
