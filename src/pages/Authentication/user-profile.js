import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form,
} from "reactstrap";
import avatar from "../../assets/images/logo.png";
import { useRiazHook } from "../../MyCutomeStore/RiazStore";
import { toast } from "react-toastify";

const UserProfile = () => {
  //these are my use states

  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");

  //this is my code for getting data from my hook
  const { userData, logedInUserId } = useRiazHook();

  //this is for profile update catcherrors
  const forProfileEditCatchErrors = () => {
    let isOk = true;
    let newErrors = {};
    if (name === "") {
      newErrors.name = "Name is required";
      toast.error("Name is required");
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{userData.name || "Admin"}</h5>
                        <p className="mb-1">Email Id : {userData.email}</p>
                        <p className="mb-0">Id No : #232efr53456fe33245</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form className="form-horizontal">
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="first_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                  />
                </div>
                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    onClick={(e) => forUpdateBtnClick(e)}
                    color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
