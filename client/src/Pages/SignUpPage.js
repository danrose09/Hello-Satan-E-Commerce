import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;
  const signupHandler = async (event) => {
    event.preventDefault();
    if (password !== confPassword) {
      alert("Passwords must match");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      contextDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      <ToastContainer position="top-center">
        <Toast>
          <Toast.Body>Invalid email or password</Toast.Body>
        </Toast>
        ;
      </ToastContainer>;
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container>
      <Form onSubmit={signupHandler}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confPassword"
            type="password"
            value={confPassword}
            onChange={(e) => {
              setConfPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <div>
          <p>New user?</p>
          <Link to={`/signin?redirect=${redirect}`}>Have an account?</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
