import React, { useContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Form, Button, Container, Spinner } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAILURE":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_REQUEST" });
    if (password === confirmPassword) {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/users/profile",
          {
            name,
            email,
            password,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "UPDATE_SUCCESS" });
        contextDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch({ type: "UPDATE_FAILURE" });
        alert(error);
      }
    } else {
      dispatch({ type: "UPDATE_FAILURE" });
      alert("Passwords must match");
    }
  };

  return (
    <div>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <Container>
        <h1>User Profile</h1>
        {loadingUpdate ? (
          <Spinner></Spinner>
        ) : (
          <form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {updateSuccess && (
              <div>
                <p style={{ color: "green" }}>User info updated succesfully.</p>
              </div>
            )}
            <div>
              <Button className="mt-3" type="submit">
                Update Profile
              </Button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
