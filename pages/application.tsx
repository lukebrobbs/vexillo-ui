import React, { FunctionComponent, useReducer } from "react";
import axios from "axios";

interface CreateAppState {
  status: "IDLE" | "FETCHING" | "ERROR";
  form: {
    name: string;
    description: string;
    createdBy: string;
    flags: [];
  };
}

type ReducerEvent =
  | { type: "SET_APP_NAME"; name: string }
  | { type: "SET_APP_DESCRIPTION"; description: string }
  | { type: "SUBMIT_FORM" }
  | { type: "SUBMIT_FORM_SUCCESS" }
  | { type: "SUBMIT_FORM_FAIL" };

const newAppFormReducer = (
  state: CreateAppState,
  event: ReducerEvent
): CreateAppState => {
  switch (event.type) {
    case "SET_APP_NAME":
      return {
        ...state,
        form: {
          ...state.form,
          name: event.name,
        },
      };
    case "SET_APP_DESCRIPTION":
      return {
        ...state,
        form: {
          ...state.form,
          description: event.description,
        },
      };
    case "SUBMIT_FORM":
      return {
        ...state,
        form: {
          ...state.form,
        },
        status: "FETCHING",
      };
    case "SUBMIT_FORM_FAIL":
      return {
        ...state,
        form: {
          ...state.form,
        },
        status: "ERROR",
      };
    case "SUBMIT_FORM_SUCCESS":
      return intialState;
  }
};

const intialState: CreateAppState = {
  status: "IDLE",
  form: {
    name: "",
    description: "",
    createdBy: "Tague",
    flags: [],
  },
};

const Application: FunctionComponent = () => {
  const [state, dispatch] = useReducer(newAppFormReducer, intialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_FORM" });

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/applications`, state.form)
      .then(() => {
        dispatch({ type: "SUBMIT_FORM_SUCCESS" });
      })
      .catch(() => {
        dispatch({ type: "SUBMIT_FORM_FAIL" });
      });
  };

  if (state.status === "FETCHING") {
    return <p>Loading...</p>;
  }

  if (state.status === "ERROR") {
    return <p>Oops, something went wrong</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new application</h1>
      <label htmlFor="appName">Name</label>
      <input
        id="appName"
        value={state.form.name}
        onChange={(e) =>
          dispatch({ type: "SET_APP_NAME", name: e.target.value })
        }
      />
      <label htmlFor="appDescription">Description</label>

      <textarea
        id="appDescription"
        value={state.form.description}
        onChange={(e) =>
          dispatch({ type: "SET_APP_DESCRIPTION", description: e.target.value })
        }
      />
      <button>SUBMIT</button>
    </form>
  );
};

export default Application;
