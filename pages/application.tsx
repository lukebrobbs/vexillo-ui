import React, { FunctionComponent, useReducer } from "react";

interface CreateAppState {
  appName: string;
  project: string;
}

interface CreateAppEvent {
  type: "SET_APP_NAME" | "SET_APP_PROJECT";
}
interface SetAppNameEvent extends CreateAppEvent {
  type: "SET_APP_NAME";
  appName: string;
}

interface SetAppProjectEvent {
  type: "SET_PROJECT_NAME";
  project: string;
}

type ReducerEvent = SetAppNameEvent | SetAppProjectEvent;

const newAppFormReducer = (
  state: CreateAppState,
  event: ReducerEvent
): CreateAppState => {
  switch (event.type) {
    case "SET_APP_NAME":
      return {
        ...state,
        appName: event.appName,
      };
    case "SET_PROJECT_NAME":
      return {
        ...state,
        project: event.project,
      };
  }
};

const intialState: CreateAppState = {
  appName: "",
  project: "",
};

const Application: FunctionComponent = () => {
  const [state, dispatch] = useReducer(newAppFormReducer, intialState);

  return (
    <form>
      <h1>Add new application</h1>
      <input
        value={state.appName}
        onChange={(e) =>
          dispatch({ type: "SET_APP_NAME", appName: e.target.value })
        }
      />
      <input
        value={state.project}
        onChange={(e) =>
          dispatch({ type: "SET_PROJECT_NAME", project: e.target.value })
        }
      />
    </form>
  );
};

export default Application;
