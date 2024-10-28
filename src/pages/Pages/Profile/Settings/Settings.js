import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";

//import images
import progileBg from "../../../../assets/images/profile-bg.jpg";
import avatar1 from "../../../../assets/images/logo.png";
import { useRiazHook } from "../../../../MyCutomeStore/RiazStore";
import { toast } from "react-toastify";
import { method } from "lodash";

const Settings = () => {
  const [current_password, setCurrnetPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_confirmation, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [username, setUserName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");

  //this is my code for getting data from my hook
  const { userData, logedInUserId, isPassword } = useRiazHook();

  //this is for profile update catcherrors
  const forProfileEditCatchErrors = () => {
    let isOk = true;
    let newErrors = {};
    if (name === "") {
      newErrors.name = "Name is required";
      toast.error("Name is required");
      isOk = false;
    } else if (email === "") {
      newErrors.email = "Email is required";
      toast.error("email is required");
      isOk = false;
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for getting single user data for update
  const forGetSingleUserData = async () => {
    const url = `https://backend.militaryhousingcenter.net/api/requestuser/${logedInUserId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get user data for update function",
        err
      );
    }
  };

  useEffect(() => {
    forGetSingleUserData();
  }, []);

  //this is for update
  const forUpdateBtnClick = (e) => {
    e.preventDefault();
    if (forProfileEditCatchErrors()) {
      let formData = {
        name,
        email,
        city,
        state,
        address,
        zip,
        username: name,
        company,
        phone,
        profile,
      };

      //this is for update
      const forUpdateUserProfile = async () => {
        const url = `https://backend.militaryhousingcenter.net/api/requestuser/update/${logedInUserId}`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.message);
          } else {
            toast.error("Failed to update profile");
          }
        } catch (err) {
          console.log("there is errror in the update user function", err);
        }
      };
      forUpdateUserProfile();
    }
  };

  //this is for validation
  const forChangePasswordCatchErrors = () => {
    let isOk = true;
    let newErrors = {};

    if (!current_password.trim()) {
      newErrors.current_password = "Please enter your current password";
      toast.error("please enter Current passwrod");
      isOk = false;
    } else if (new_password.length < 8) {
      newErrors.new_password = "Password should be at least 8 Characters";
      toast.error("password should be at least 8 characters");
      isOk = false;
    } else if (new_password_confirmation !== new_password) {
      newErrors.new_password_confirmation = "password Incorrect";
      toast.error("password and confirm password should be same");
      isOk = false;
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for change password click
  const forChangePasswordBtnClick = (e) => {
    e.preventDefault();
    if (forChangePasswordCatchErrors()) {
      let formData = {
        current_password,
        new_password,
        new_password_confirmation,
      };

      //this is for sending data
      const forChangePassword = async () => {
        const url = `https://backend.militaryhousingcenter.net/api/password/change/${logedInUserId}`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success("Password changed successfully");
            console.log("ok data", data);
          } else {
            console.log("err data", data);
            toast.error(data.message);
          }
        } catch (err) {
          console.log("there is error in the change password function", err);
        }
      };
      forChangePassword();
    }
  };

  const forTab = isPassword ? "2" : "1";

  const [activeTab, setActiveTab] = useState(forTab);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={progileBg} className="profile-wid-img" alt="" />
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light">
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={avatar1}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <Input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                        />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs">
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-17 mb-1">{userData.name}</h5>
                    <p className="text-muted mb-0">Founder</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist">
                    <NavItem>
                      <NavLink
                        className={`${classnames({
                          active: activeTab === "1",
                        })} cursor-pointer`}
                        onClick={() => {
                          tabChange("1");
                        }}>
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2");
                        }}
                        type="button">
                        <i className="far fa-user"></i>
                        Change Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Form>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label">
                                Name
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="firstnameInput"
                                placeholder="Enter your name"
                              />
                              {errors.name && (
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    paddingLeft: "5px",
                                  }}>
                                  {errors.name}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="lastnameInput"
                                className="form-label">
                                Email
                              </Label>
                              <Input
                                type="email"
                                value={email}
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                id="lastnameInput"
                                placeholder="Enter your Eamil"
                              />
                              {errors.email && (
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    paddingLeft: "5px",
                                  }}>
                                  {errors.email}
                                </p>
                              )}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="phonenumberInput"
                                className="form-label">
                                Phone
                              </Label>
                              <Input
                                type="number"
                                value={phone}
                                className="form-control"
                                id="phonenumberInput"
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="emailInput"
                                className="form-label">
                                State
                              </Label>
                              <Input
                                type="text"
                                value={state}
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter your  State
                                "
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="designationInput"
                                className="form-label">
                                City
                              </Label>
                              <Input
                                type="text"
                                value={city}
                                className="form-control"
                                onChange={(e) => setCity(e.target.value)}
                                id="designationInput"
                                placeholder="Enter your city"
                              />{" "}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="websiteInput1"
                                className="form-label">
                                Address
                              </Label>
                              <Input
                                type="text"
                                value={address}
                                className="form-control"
                                onChange={(e) => setAddress(e.target.value)}
                                id="websiteInput1"
                                placeholder="Enter you Address"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="websiteInput1"
                                className="form-label">
                                Company
                              </Label>
                              <Input
                                type="text"
                                value={company}
                                className="form-control"
                                onChange={(e) => setCompany(e.target.value)}
                                id="websiteInput1"
                                placeholder="Enter you Comapany"
                              />
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="zipcodeInput"
                                className="form-label">
                                Zip Code
                              </Label>
                              <Input
                                type="text"
                                value={zip}
                                className="form-control"
                                onChange={(e) => setZip(e.target.value)}
                                id="zipcodeInput"
                                placeholder="Enter zipcode"
                              />
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button
                                type="submit"
                                onClick={(e) => forUpdateBtnClick(e)}
                                className="btn btn-primary">
                                Updates
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>

                    <TabPane tabId="2">
                      <Form>
                        <Row className="g-2">
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="oldpasswordInput"
                                className="form-label">
                                Old Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="oldpasswordInput"
                                onChange={(e) =>
                                  setCurrnetPassword(e.target.value)
                                }
                                placeholder="Enter current password"
                              />
                              {errors.current_password && (
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    paddingLeft: "5px",
                                  }}>
                                  {errors.current_password}
                                </p>
                              )}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="newpasswordInput"
                                className="form-label">
                                New Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                onChange={(e) => setNewPassword(e.target.value)}
                                id="newpasswordInput"
                                placeholder="Enter new password"
                              />
                              {errors.new_password && (
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    paddingLeft: "5px",
                                  }}>
                                  {errors.new_password}
                                </p>
                              )}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="confirmpasswordInput"
                                className="form-label">
                                Confirm Password*
                              </Label>
                              <Input
                                type="password"
                                onChange={(e) =>
                                  setConfirmNewPassword(e.target.value)
                                }
                                className="form-control"
                                id="confirmpasswordInput"
                                placeholder="Confirm password"
                              />
                              {errors.new_password_confirmation && (
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    paddingLeft: "5px",
                                  }}>
                                  {errors.new_password_confirmation}
                                </p>
                              )}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="mb-3">
                              <Link
                                to="#"
                                className="link-primary text-decoration-underline">
                                Forgot Password ?
                              </Link>
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="text-end">
                              <button
                                type="submit"
                                onClick={(e) => forChangePasswordBtnClick(e)}
                                className="btn btn-success">
                                Change Password
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
