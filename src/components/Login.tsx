import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation, gql } from "@apollo/client";
import { LOGIN_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!) {
    signup(name: $name) {
      id
      name
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`;

const Login = () => {
  const token = localStorage.getItem(LOGIN_TOKEN);
  console.log(token);
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    name: "",
  });
  const [errorState, setErrorState] = useState<string>("");
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      name: formState.name,
    },
    onCompleted: ({ login }) => {
      console.log(login);
      if (login) {
        localStorage.setItem(LOGIN_TOKEN, login.name);
        history.push("/");
      } else {
        setErrorState("Usuário não existe");
      }
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(LOGIN_TOKEN, signup.name);
      history.push("/");
    },
  });

  const logout = () => {
    localStorage.removeItem(LOGIN_TOKEN);
  };

  return (
    <div>
      <h4>Enter your name</h4>
      <p style={{ color: "red" }}>{errorState}</p>
      <div>
        <input
          value={formState.name}
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value,
            })
          }
          type="text"
          placeholder="Your name"
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            formState.name.length > 0
              ? login()
              : setErrorState("preencha algum bagulho");
          }}
        >
          Login
        </button>
        <button
          onClick={(e) => {
            formState.name.length > 0
              ? signup()
              : setErrorState("preencha algum bagulho");
          }}
        >
          Signup
        </button>
        <button
          onClick={(e) => {
            logout();
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Login;
