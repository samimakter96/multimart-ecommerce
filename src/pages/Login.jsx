import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          {loading ? (
            <Col lg="12" className="text-center">
              <h5 className="fw-bold">Loading....</h5>
            </Col>
          ) : (
            <Col
              lg="5"
              className="m-auto text-center shadow p-4 rounded-3 mt-5 mb-5"
            >
              <h3 className="fw-bold fs-3 mb-4">Login</h3>

              <Form className="auth__form" onSubmit={signIn}>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold rounded"
                >
                  Login
                </button>
                <p className="mt-3 text-secondary fs-6">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary">
                    Create an account
                  </Link>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Login;
