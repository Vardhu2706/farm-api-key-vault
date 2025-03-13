import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import {
  useRegisterMutation,
  useGetQRCodeMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [otpAuthURL, setOtpAuthURL] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const [getQRCode, { isLoading: isGenerating }] = useGetQRCodeMutation();

  const generateQRHandler = async () => {
    if (!email) return toast.error("Please enter an email first");
    try {
      const res = await getQRCode(email).unwrap();
      setOtpAuthURL(res.otp_auth_url);
      setSecret(res.secret);
    } catch (err) {
      toast.error("Failed to generate QR code");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !secret ||
      !otpAuthURL ||
      !token
    ) {
      return toast.error("Please fill in all required fields.");
    }

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await register({
        name,
        email,
        password,
        secret,
        otp_auth_url: otpAuthURL,
        token,
      }).unwrap();

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6} className="d-flex flex-column align-items-center">
            <Button
              type="button"
              className="my-2"
              onClick={generateQRHandler}
              disabled={isGenerating || !email}
            >
              Generate OTP Key
            </Button>

            {otpAuthURL && (
              <div
                style={{
                  padding: "10px",
                  background: "white",
                  margin: "10px 0",
                }}
              >
                <QRCode value={otpAuthURL} size={180} />
              </div>
            )}

            <Form.Group className="my-2" controlId="token">
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="mt-3">
              Register
            </Button>
            <Row className="py-3">
              <Col>
                {" "}
                Existing customer? <Link to="/login">Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
