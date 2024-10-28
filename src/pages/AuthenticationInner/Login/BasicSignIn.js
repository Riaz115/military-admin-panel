import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";

//import images
import logoLight from "../../../assets/images/redlogo.png";

const BasicSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //this is for naviagate cont
  const naviagate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  //   const handleName = (e) => {
  //     setName(e.target.value);
  //   };

  const handleLogin = (e) => {
    e.preventDefault();

    const forCheckLogin = async () => {
      try {
        const result = await axios.post(
          "https://backend.militaryhousingcenter.net/api/userlogin",
          {
            email: email,
            password: password,
          }
        );
        localStorage.setItem("token", result.token);
        localStorage.setItem("userName", result.name);
        localStorage.setItem("uid", result.uid);
        toast.success("login successfully");
        naviagate("/");
      } catch (err) {
        console.error("there is error in login function", err);
        toast.error("invalid user");
      }
    };

    forCheckLogin();
  };

  //   //this is for sing up
  //   const handleSignup = () => {
  //     axios
  //       .post("https://backend.militaryhousingcenter.net/api/userregister", {
  //         name: name,
  //         email: email,
  //         password: password,
  //       })
  //       .then((result) => {
  //         toast.success(result.data.message);
  //         console.log(result);
  //         setFormType("signin");
  //         handleLogin();
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Signup Error:",
  //           error.response ? error.response.data : error.message
  //         );
  //         toast.warning(
  //           "Issue during signup: " +
  //             (error.response ? error.response.data.message : error.message)
  //         );
  //       });
  //   };

  //   //this is for handle reset
  //   const handleReset = () => {
  //     axios
  //       .post(
  //         `https://backend.militaryhousingcenter.net/api/sendresetlink?email=${email}`,
  //         {
  //           email: email,
  //         }
  //       )
  //       .then((response) => {
  //         // Check if the reset token is returned
  //         if (response.data && response.data.reset_token) {
  //           const resetToken = response.data.reset_token;
  //           toast.warning(response.data.message);
  //           console.log("Reset token:", resetToken);
  //           localStorage.setItem("reset_token", resetToken);
  //           // Save the token to state if needed
  //           setResetToken(resetToken);
  //           setFormType("signin");
  //         } else {
  //           toast.warning(response.data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error.response ? error.response.data : error.message);
  //         toast.error(
  //           error.response ? error.response.data.message : error.message
  //         );
  //       });
  //   };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="30" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium text-capitalize">
                    Welcome to Military housing center
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted text-capitalize">
                        Sign in to continue to Military housing center.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form action="#">
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            UserEmail
                          </Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            onChange={handleEmail}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link
                              to="/auth-pass-reset-basic"
                              className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type="password"
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              onChange={handlePassword}
                              required
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon">
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check">
                            Remember me
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="success"
                            className="btn btn-success w-100"
                            onClick={(e) => handleLogin(e)}
                            type="submit">
                            Sign In
                          </Button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div>
                            <Button color="primary" className="btn-icon">
                              <i className="ri-facebook-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="danger" className="btn-icon">
                              <i className="ri-google-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="dark" className="btn-icon">
                              <i className="ri-github-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="info" className="btn-icon">
                              <i className="ri-twitter-fill fs-16"></i>
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account ?{" "}
                    <Link
                      to="/auth-signup-basic"
                      className="fw-semibold text-primary text-decoration-underline">
                      {" "}
                      Signup{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default BasicSignIn;
