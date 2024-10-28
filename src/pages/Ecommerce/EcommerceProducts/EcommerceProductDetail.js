import React, { useEffect, useState, useMemo } from "react";
import { Container, Input, Label, Row, Table, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loader from "../../../Components/Common/Loader";
import Pagination from "../../../Components/Common/Pagination";

function EcommerceProductDetail(props) {
  const [agents, setAgents] = useState([]);
  const [myAgents, setMyAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //this is for get all agents
  const forGetallAgents = async () => {
    const url = "https://backend.militaryhousingcenter.net/api/agents/types";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAgents(data);
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Agent Types" />

          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div>
                <Button color="success" className="add-btn" id="create-btn">
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
                  <th scope="col">AgentType</th>
                  <th scope="col">Agents Count</th>
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
                      ....Loading Titles
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
                        <Link to="#w-medium">{index + 1}</Link>
                      </td>
                      <td>{item.agent_type}</td>
                      <td>{item.agent_count}</td>

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
      </div>
    </React.Fragment>
  );
}

export default EcommerceProductDetail;
