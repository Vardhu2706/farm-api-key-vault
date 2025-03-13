import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  // Getting User Info from state
  const { userInfo } = useSelector((state) => state.auth);

  // Using useEffect to redirect if logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password, token }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Logged In");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={loginHandler}>
          {/* Email */}
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Password */}
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* OTP */}
          <Form.Group className="my-2" controlId="token">
            <Form.Label>Token</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Button type="submit" variant="primary" className="mt-3">
                Sign In
              </Button>
              <Row className="py-3">
                <Col>
                  {" "}
                  New Customer? <Link to="/register">Register</Link>
                </Col>
              </Row></>

          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
