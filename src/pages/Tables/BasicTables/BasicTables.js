import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Input,
  Label,
  Row,
  Table,
  Col,
  Button,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Common/Pagination";
import Loader from "../../../Components/Common/Loader";
import avtarImage3 from "../../../assets/images/logo.png";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";

const BasicTables = () => {
  const [agents, setAgents] = useState([]);
  const [myAgents, setMyAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRight, setIsRight] = useState(false);
  const [image, setimage] = useState("");
  const [vedio, setVedio] = useState("");

  //this is for getting token
  const token = localStorage.getItem("token");

  console.log("token", token);

  //this is for agenst
  const [agentInfo, setAgentInfo] = useState({
    agent_type: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    title: "",
    about: "",
    hours: "",
    website: "",
    facebook: "",
    linkedin: "",
    twitter: "",
  });

  //this i for handle input change
  const handleChange = (e) => {
    setAgentInfo({ ...agentInfo, [e.target.name]: e.target.value });
  };

  //this is for validation
  const validateForm = () => {
    const {
      agent_type,
      name,
      email,
      phone,
      city,
      state,
      title,
      about,
      hours,
      website,
      facebook,
      linkedin,
      twitter,
    } = agentInfo;

    if (!vedio) return "Vedio";
    if (!image) return "Photo";
    if (!agent_type) return "Agent Type";
    if (!name) return "Name";
    if (!email) return "Email";
    if (!phone) return "Phone";
    if (!city) return "City";
    if (!state) return "State";
    if (!title) return "Title";
    if (!about) return "About";
    if (!hours) return "Hours";
    if (!website) return "Website";
    if (!facebook) return "Facebook";
    if (!linkedin) return "LinkedIn";
    if (!twitter) return "Twitter";

    return null; // No missing fields
  };

  //this is for get all agents
  const forGetallAgents = async () => {
    const url = "https://backend.militaryhousingcenter.net/api/agents/all";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAgents(data.agents);
        setIsLoading(false);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get all users function", err);
    }
  };

  useEffect(() => {
    forGetallAgents();
  }, []);

  //this is for open the add property right side modal
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for pagination
  const perPageData = 10;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => agents?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setMyAgents(agents.slice(0, perPageData));
  }, [agents]);

  //this is for set current data of page
  useEffect(() => {
    setMyAgents(currentdata);
  }, [currentdata]);

  //this is for search from users
  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      const filteredUsers = agents.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setMyAgents(filteredUsers.slice(0, perPageData));
      setCurrentPage(1);
    } else {
      setMyAgents(agents.slice(indexOfFirst, indexOfLast));
    }
  };

  //this is for add agent type
  const handleSubmitAddAgent = async (e) => {
    e.preventDefault();

    // Validate form
    const missingField = validateForm();
    if (missingField) {
      toast.error(`Please fill out the ${missingField} field.`);
      return;
    } else {
      // // Prepare data to send
      // const formData = {
      //   agent_type: agentInfo.agent_type,
      //   name: agentInfo.name,
      //   email: agentInfo.email,
      //   phone: agentInfo.phone,
      //   city: agentInfo.city,
      //   state: agentInfo.state,
      //   title: agentInfo.title,
      //   about: agentInfo.about,
      //   hours: agentInfo.hours,
      //   website: agentInfo.website,
      //   facebook: agentInfo.facebook,
      //   linkedin: agentInfo.linkedin,
      //   twitter: agentInfo.twitter,
      //   vedio: vedio,
      //   photo: image,
      // };
      let formData = new FormData();

      formData.append("agent_type", agentInfo.agent_type);
      formData.append("name", agentInfo.name);
      formData.append("email", agentInfo.email);
      formData.append("phone", agentInfo.phone);
      formData.append("city", agentInfo.city);
      formData.append("state", agentInfo.state);
      formData.append("title", agentInfo.title);
      formData.append("about", agentInfo.about);
      formData.append("hours", agentInfo.hours);
      formData.append("website", agentInfo.website);
      formData.append("facebook", agentInfo.facebook);
      formData.append("linkedin", agentInfo.linkedin);
      formData.append("twitter", agentInfo.twitter);

      // Adding video and image files (assuming they are file inputs)
      formData.append("vedio", vedio); // Video file
      formData.append("photo", image); // Image file

      //this is for the add property
      const forAddAgent = async () => {
        const url =
          "https://backend.militaryhousingcenter.net/api/agents/addagent";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            toast.success(data.message);
            console.log("ok data", data);
          } else {
            console.log("err data", data);
            toast.error("err data", data.message);
          }
        } catch (err) {
          console.log("there is error in the add agent function", err);
        }
      };
      forAddAgent();
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Agensts" />

          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div>
                <Button
                  color="success"
                  className="add-btn"
                  id="create-btn"
                  onClick={toggleRightCanvas}>
                  <i className="ri-add-line align-bottom me-1"></i> Add
                </Button>
                <Button
                  className="btn btn-soft-danger"
                  // onClick="deleteMultiple()"
                >
                  <i className="ri-delete-bin-2-line"></i>
                </Button>
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-flex justify-content-sm-end">
                <div className="search-box ms-2">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search..."
                    onChange={(e) => OnchangeHandler(e)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </div>
            </Col>
          </Row>

          <div className="table-responsive striped">
            <Table className="align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "42px" }}>
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="responsivetableCheck"
                      />
                      <Label
                        className="form-check-label"
                        for="responsivetableCheck"></Label>
                    </div>
                  </th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">company</th>
                  <th scope="col">city</th>
                  <th scope="col">Review</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ position: "fixed", left: "50%", top: "50%" }}>
                    <Loader />{" "}
                    <span className="text-capitalize fs-5">
                      ....Loading Agents
                    </span>
                  </div>
                ) : (
                  myAgents.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="responsivetableCheck01"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="responsivetableCheck01"></Label>
                        </div>
                      </th>
                      <td>
                        <Link to="#w-medium">{item.id}</Link>
                      </td>
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src={
                                item.photo_url ? item.photo_url : avtarImage3
                              }
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">{item.name}</div>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td className="text-success">{item.title}</td>
                      <td>{item.agent_type}</td>
                      <td>{item.company.name}</td>
                      <td>{item.city}</td>
                      <td>{item.review_count}</td>
                      <td>
                        <div className="hstack gap-2">
                          <button className="btn btn-sm btn-soft-danger remove-list">
                            <i className="ri-delete-bin-5-fill align-bottom" />
                          </button>
                          <button className="btn btn-sm btn-soft-info edit-list">
                            <i className="ri-pencil-fill align-bottom" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end">
              <div className="my-3 p-3">
                <Pagination
                  perPageData={perPageData}
                  data={agents}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </Container>

        {/* Right offcanvas */}
        <Offcanvas
          isOpen={isRight}
          direction="end"
          toggle={toggleRightCanvas}
          id="offcanvasRight"
          className="border-bottom w-75  ">
          <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
            <h1>Add Agent</h1>
          </OffcanvasHeader>
          <OffcanvasBody className="p-0 overflow-scroll">
            <SimpleBar style={{ height: "100vh" }}>
              <div className="px-5 py-3">
                <Row>
                  <Col lg={12}>
                    <div className="text-center mb-3">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute bottom-0 end-0">
                          <Label htmlFor="company-logo-input" className="mb-0">
                            <div className="avatar-xs cursor-pointer">
                              <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="ri-image-fill"></i>
                              </div>
                            </div>
                          </Label>
                          <Input
                            name="file"
                            className="form-control d-none"
                            id="company-logo-input"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setimage(file);
                            }}
                          />
                        </div>
                        <div className="avatar-lg p-1">
                          <div className="avatar-title bg-light rounded-circle">
                            <img
                              src={
                                image ? URL.createObjectURL(image) : avtarImage3
                              }
                              alt="multiUser"
                              id="companylogo-img"
                              className="avatar-md rounded-circle object-fit-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <h5 className="fs-13 mt-3">Agent Image</h5>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Agent Type</label>
                      <select
                        name="agent_type"
                        value={agentInfo.agent_type}
                        onChange={handleChange}
                        className="form-control">
                        <option value="">Select</option>
                        <option value="lender">Lender</option>
                        <option value="agent">Agent</option>
                      </select>
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder="enter name"
                        name="name"
                        value={agentInfo.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="enter eamil"
                        name="email"
                        value={agentInfo.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="enter phone
                      "
                        value={agentInfo.phone}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="enter city"
                        value={agentInfo.city}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="enter state"
                        value={agentInfo.state}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="enter title"
                        value={agentInfo.title}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>About</label>
                      <input
                        type="text"
                        name="about"
                        placeholder="enter about"
                        value={agentInfo.about}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>

                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Hours</label>
                      <input
                        type="number"
                        name="hours"
                        placeholder="enter hours"
                        value={agentInfo.hours}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>

                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>website Link</label>
                      <input
                        type="url"
                        name="website"
                        placeholder="enter website link"
                        value={agentInfo.website}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>

                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Facebook Link</label>
                      <input
                        type="url"
                        name="facebook"
                        placeholder="enter facebook link"
                        value={agentInfo.facebook}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>

                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Linkedin Link</label>
                      <input
                        type="url"
                        name="linkedin"
                        placeholder="enter linkedin link"
                        value={agentInfo.linkedin}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>

                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Twitter Link</label>
                      <input
                        type="url"
                        placeholder="enter twitter link"
                        name="twitter"
                        value={agentInfo.twitter}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col sm={6} className="my-2">
                    <div className="form-group">
                      <label>Vedio </label>
                      <input
                        name="vedio"
                        className="form-control"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        multiple
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setVedio(file);
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="hstack gap-2 justify-content-end my-5">
                  <button
                    type="button"
                    className="btn bg-dark text-white"
                    onClick={toggleRightCanvas}>
                    Close
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => handleSubmitAddAgent(e)}
                    className="btn btn-primary"
                    id="add-btn">
                    Add Agent
                  </button>
                </div>
              </div>
            </SimpleBar>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </React.Fragment>
  );
};

export default BasicTables;
