import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "../styles/Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // store user data in firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Container>
        {loading ? (
          <Col
            lg="12"
            className=" mt-4 d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <ScaleLoader color="#36d7b7" />
          </Col>
        ) : (
          <Row>
            <Col
              lg="5"
              className="m-auto text-center shadow p-4 rounded-3 mt-5 mb-5"
            >
              <h3 className="fw-bold fs-3 mb-4">Signup</h3>

              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
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
                <FormGroup className="form__group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold rounded"
                >
                  Create an Account
                </button>
                <p className="mt-3 text-secondary fs-6">
                  have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Log in here
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Signup;
