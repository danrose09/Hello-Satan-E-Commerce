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

const SignInPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;
  const signinHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        {
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
      <Form onSubmit={signinHandler}>
        <Form.Group>
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
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        <div>
          <p>New user?</p>
          <Link to={`/signup?redirect=${redirect}`}>Create an account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
