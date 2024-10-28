import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Label,
  Input,
} from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";
import logoLight from "../../../assets/images/redlogo.png";
import axios from "axios";

const BasicPasswReset = () => {
  //this is my code
  const [email, setEmail] = useState("");
  console.log("email", email);

  // const handleReset = () => {
  //   axios
  //     .post(
  //       `https://backend.militaryhousingcenter.net/api/sendresetlink?email=${email}`,
  //       {
  //         email: email,
  //       }
  //     )
  //     .then((response) => {
  //       // Check if the reset token is returned
  //       console.log(response);
  //       if (response.data && response.data.reset_token) {
  //         console.log("my data", response.data);
  //         const resetToken = response.data.reset_token;
  //         toast.warning(response.data.message);
  //         console.log("Reset token:", resetToken);
  //         localStorage.setItem("reset_token", resetToken);
  //         setResetToken(resetToken);
  //         setFormType("signin");
  //       } else {
  //         toast.warning(response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error.response ? error.response.data : error.message);
  //       toast.error(
  //         error.response ? error.response.data.message : error.message
  //       );
  //     });
  // };

  //this is for forgot password
  const forResetPassword = async (e) => {
    e.preventDefault();
    const url = `https://backend.militaryhousingcenter.net/api/sendresetlink?email=${email}`;
    console.log("url ", url);

    try {
      const response = await axios.post(url, { email: email });
      console.log("response", response);
      if (response.data && response.data.reset_token) {
        console.log("my data", response.data);
        const resetToken = response.data.reset_token;
        toast.warning(response.data.message);
        console.log("Reset token:", resetToken);
        localStorage.setItem("reset_token", resetToken);
      } else {
        console.log("there is some  error in reset password function");
      }
    } catch (err) {
      console.log("there is error in the rest password function", err);
    }
  };

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/#" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="20" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-semibold">
                  Military Housing Center
                </p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">
                      Reset password with Military housing center
                    </p>

                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}></lord-icon>
                  </div>

                  <Alert
                    className="border-0 alert-warning text-center mb-2 mx-2"
                    role="alert">
                    Enter your email and instructions will be sent to you!
                  </Alert>
                  <div className="p-2">
                    <Form>
                      <div className="mb-4">
                        <Label className="form-label">Email</Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button
                          className="btn btn-success w-100"
                          onClick={(e) => forResetPassword(e)}>
                          Send Reset Link
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/auth-signin-basic"
                    className="fw-bold text-primary text-decoration-underline">
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

export default BasicPasswReset;
