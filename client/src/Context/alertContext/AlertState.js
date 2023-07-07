import { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { v4 } from "uuid";
// import { ADD_ALERT, CLEAR_ALERT } from "../type";
import { ADD_ALERT, CLEAR_ALERT } from "../type";

const AlertState = (prop) => {
  const initialState = {
    alert: [],
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const addAlert = (text, type) => {
    const newId = v4();

    dispatch({ type: ADD_ALERT, payload: { id: newId, text: text, type } });

    setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: newId }), 5000);
  };

  const value = {
    alert: state.alert,
    addAlert,
  };

  return (
    <AlertContext.Provider value={value}>{prop.children}</AlertContext.Provider>
  );
};

export default AlertState;
