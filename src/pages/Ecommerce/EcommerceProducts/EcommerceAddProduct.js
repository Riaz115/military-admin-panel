import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Label,
  Input,
  Table,
  Row,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import avatar1 from "../../../assets/images/galaxy/img-3.png";
import { toast } from "react-toastify";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loader from "../../../Components/Common/Loader";
import Pagination from "../../../Components/Common/Pagination";

const EcommerceAddProduct = () => {
  //this is my code
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRight, setIsRight] = useState(false);
  const [image, setimage] = useState("");

  //this is for testing
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Get the newly selected files
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  //this is for getting token
  const token = localStorage.getItem("token");

  //this is for open the add property right side modal
  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  //this is for the get all properties
  const getAllProperties = async () => {
    const url = "https://backend.militaryhousingcenter.net/api/property/sale";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setProperties(data.properties);
        setIsLoading(false);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there  is error in get all properties function", err);
    }
  };

  //this is for use effect
  useEffect(() => {
    getAllProperties();
  }, []);

  //this is for pagination
  const perPageData = 10;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  //this is for page current data
  const currentdata = useMemo(
    () => properties?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  //this is for first time load and set data
  useEffect(() => {
    setAllProperties(properties.slice(0, perPageData));
  }, [properties]);

  //this is for set current data of page
  useEffect(() => {
    setAllProperties(currentdata);
  }, [currentdata]);

  //this is for search from properties
  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      const filteredUsers = properties.filter((data) =>
        Object.values(data).some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(search.toLowerCase())
        )
      );
      setAllProperties(filteredUsers.slice(0, perPageData));
      setCurrentPage(1);
    } else {
      setAllProperties(properties.slice(indexOfFirst, indexOfLast));
    }
  };

  //this is usestate for add property
  const [propertyInfo, setPropertyInfo] = useState({
    forwhat: "Sale",
    address: "",
    city: "",
    state: "",
    beds: "",
    baths: "",
    sqft: "",
    price: "",
    property_type: "",
    hoa: "",
    number_parking: "",
    garage: "no",
    lot_size: "",
    year_built: "",
    basement: "no",
    stories: "no",
    mhc_owned: "no",
    keywords: "",
    open: "no",
    threed: "no",
    largedog: "no",
    smalldog: "no",
    cats: "no",
    ac: "no",
    laundry: "no",
    pool: "no",
    mhcapp: "no",
    waterfront: "no",
    income: "no",
    onsite: "no",
    cityv: "no",
    park: "no",
    mountain: "no",
    water: "no",
  });

  // Handler for general input fields
  const handleChange = (e) => {
    setPropertyInfo({ ...propertyInfo, [e.target.name]: e.target.value });
  };

  // Handler for feature checkboxes
  const handleFeatureChange = (e) => {
    setPropertyInfo({
      ...propertyInfo,
      [e.target.name]: e.target.checked ? "yes" : "no",
    });
  };

  const validateForm = () => {
    const {
      forwhat,
      address,
      city,
      state,
      beds,
      baths,
      sqft,
      price,
      // photo,
      property_type,
      hoa,
      number_parking,
      lot_size,
      year_built,
      keywords,
    } = propertyInfo;

    if (!forwhat) return "For What";
    if (!price) return "Price";
    if (!beds) return "Beds";
    if (!baths) return "Baths";
    if (!city) return "City";
    if (!state) return "State";
    if (!address) return "Address";
    if (!sqft) return "Square Footage";

    // if (!photo) return "Photo";
    if (!property_type) return "Property Type";
    if (!hoa) return "HOA";
    if (!year_built) return "Year Built";
    if (!keywords) return "Keywords";
    if (!number_parking) return "Number of Parking Spots";
    if (!lot_size) return "Lot Size";

    return null; // No missing fields
  };

  const handleSubmitAddProperties = async (e) => {
    e.preventDefault();

    // Validate form
    const missingField = validateForm();
    if (missingField) {
      toast.error(`Please fill out the ${missingField} field.`);
      return;
    }

    // Prepare data to send
    const formData = {
      forwhat: propertyInfo.forwhat,
      address: propertyInfo.address,
      city: propertyInfo.city,
      state: propertyInfo.state,
      beds: propertyInfo.beds,
      baths: propertyInfo.baths,
      sqft: propertyInfo.sqft,
      price: propertyInfo.price,
      image: image,
      gallery: images,
      property_type: propertyInfo.property_type,
      hoa: propertyInfo.hoa,
      number_parking: propertyInfo.number_parking,
      garage: propertyInfo.garage,
      lot_size: propertyInfo.lot_size,
      year_built: propertyInfo.year_built,
      basement: propertyInfo.basement,
      stories: propertyInfo.stories,
      mhc_owned: propertyInfo.mhc_owned,
      keywords: propertyInfo.keywords,
      open: propertyInfo.open,
      threed: propertyInfo.threed,
      largedog: propertyInfo.largedog,
      smalldog: propertyInfo.smalldog,
      cats: propertyInfo.cats,
      ac: propertyInfo.ac,
      laundry: propertyInfo.laundry,
      pool: propertyInfo.pool,
      mhcapp: propertyInfo.mhcapp,
      waterfront: propertyInfo.waterfront,
      income: propertyInfo.income,
      onsite: propertyInfo.onsite,
      cityv: propertyInfo.cityv,
      park: propertyInfo.park,
      mountain: propertyInfo.mountain,
      water: propertyInfo.water,
    };

    console.log("form data", formData);

    //this is for the add property
    const forAddProperty = async () => {
      const url =
        "https://backend.militaryhousingcenter.net/api/property/new/save";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
        } else {
          toast.error("err data", data.message);
        }
      } catch (err) {
        console.log("there is error in the add property function", err);
      }
    };
    forAddProperty();
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Sale Properties" pageTitle="Tables" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <Button
                          color="success"
                          onClick={toggleRightCanvas}
                          className="add-btn"
                          id="create-btn">
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
                          <th scope="col">Property</th>
                          <th scope="col">Address</th>
                          <th scope="col">Story</th>
                          <th scope="col">Price</th>
                          <th scope="col">sqr-ft</th>
                          <th scope="col">Year Build</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              position: "fixed",
                              left: "50%",
                              top: "50%",
                            }}>
                            <Loader />{" "}
                            <span className="text-capitalize fs-5">
                              ....Loading properties
                            </span>
                          </div>
                        ) : (
                          allProperties.map((item, index) => (
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
                                <Link to="#w-medium">{item.prop_id}</Link>
                              </td>
                              <td>
                                <div className="d-flex gap-2 align-items-center">
                                  <div className="flex-shrink-0">
                                    <img
                                      src={
                                        item.photo_prop
                                          ? item.photo_prop
                                          : userIcon
                                      }
                                      alt=""
                                      className="avatar-xs rounded-circle"
                                    />
                                  </div>
                                  <div className="flex-grow-1">
                                    {item.p_type}
                                  </div>
                                </div>
                              </td>

                              <td>
                                {item.state},{item.city},{item.address}
                              </td>
                              <td>{item.stories}</td>
                              <td>${item.price}</td>
                              <td>{item.square_ft}</td>
                              <td>{item.year_built}</td>
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
                          data={properties}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Right offcanvas */}
      <Offcanvas
        isOpen={isRight}
        direction="end"
        toggle={toggleRightCanvas}
        id="offcanvasRight"
        className="border-bottom w-75  ">
        <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
          <h1>Add Sale Property</h1>
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
                            src={image ? URL.createObjectURL(image) : avatar1}
                            alt="multiUser"
                            id="companylogo-img"
                            className="avatar-md rounded-circle object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="fs-13 mt-3">property Image</h5>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      placeholder="enter price"
                      name="price"
                      value={propertyInfo.price}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Beds</label>
                    <input
                      type="number"
                      placeholder="enter beds"
                      name="beds"
                      value={propertyInfo.beds}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Baths</label>
                    <input
                      type="number"
                      name="baths"
                      placeholder="enter baths
                      "
                      value={propertyInfo.baths}
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
                      value={propertyInfo.city}
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
                      value={propertyInfo.state}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="enter address"
                      value={propertyInfo.address}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Area (sqft)</label>
                    <input
                      type="number"
                      name="sqft"
                      placeholder="enter area sqft"
                      value={propertyInfo.sqft}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>House Type</label>
                    <select
                      name="property_type"
                      value={propertyInfo.property_type}
                      onChange={handleChange}
                      className="form-control">
                      <option value="">Select house type</option>
                      <option value="House">House</option>
                      <option value="Studio">Studio</option>
                      <option value="Condos/co-ops">Condos/co-ops</option>
                      <option value="Lots/Land">Lots/Land</option>
                      <option value="Condo">Condo</option>
                    </select>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>HOA Fee</label>
                    <input
                      type="number"
                      name="hoa"
                      placeholder="enter hoa fee"
                      value={propertyInfo.hoa}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Year Built</label>
                    <input
                      type="number"
                      name="year_built"
                      placeholder="enter year in built"
                      value={propertyInfo.year_built}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>

                <Col sm={12} className="my-2">
                  <div className="form-group">
                    <label>Keywords</label>
                    <input
                      type="text"
                      name="keywords"
                      placeholder="enter keywords"
                      value={propertyInfo.keywords}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Parking Spots</label>
                    <input
                      type="number"
                      name="number_parking"
                      placeholder="enter parking spots"
                      value={propertyInfo.number_parking}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-group">
                    <label>Lot Size</label>
                    <input
                      type="number"
                      placeholder="enter lot size"
                      name="lot_size"
                      value={propertyInfo.lot_size}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col sm={12} className="my-2">
                  <div className="form-group">
                    <label>Gallery Images</label>
                    <input
                      name="lot_size"
                      className="form-control"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="d-flex flex-wrap justify-content-start">
                    {images.length > 0 &&
                      images.map((image, index) => (
                        <div key={index} className="p-2">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`uploaded-${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }} // Set width and height
                            className="rounded"
                          />
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>

              <Row>
                <h3 className="my-2">Must-Have Features</h3>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="open"
                        checked={propertyInfo.open === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Must have open house
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="garage"
                        checked={propertyInfo.garage === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Must have Garage
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="threed"
                        checked={propertyInfo.threed === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Must have 3D home
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="ac"
                        checked={propertyInfo.ac === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Must have AC
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="pool"
                        checked={propertyInfo.pool === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Must have Pool
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="basement"
                        checked={propertyInfo.basement === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Basement
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="stories"
                        checked={propertyInfo.stories === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Single Story
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="largedog"
                        checked={propertyInfo.largedog === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Large Dogs
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="smalldog"
                        checked={propertyInfo.smalldog === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Small Dogs
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="cats"
                        checked={propertyInfo.cats === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Cats
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="laundry"
                        checked={propertyInfo.laundry === "yes"}
                        onChange={handleFeatureChange}
                      />
                      In Unit-Laundry
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="mhcapp"
                        checked={propertyInfo.mhcapp === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Mhc Applications
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="waterfront"
                        checked={propertyInfo.waterfront === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Waterfront
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="income"
                        checked={propertyInfo.income === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Income Restricted
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="cityv"
                        checked={propertyInfo.cityv === "yes"}
                        onChange={handleFeatureChange}
                      />
                      City
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="park"
                        checked={propertyInfo.park === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Park
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="mountain"
                        checked={propertyInfo.mountain === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Mountain
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="water"
                        checked={propertyInfo.water === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Water
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="mhc_owned"
                        checked={propertyInfo.mhc_owned === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Move In-Ready
                    </label>
                  </div>
                </Col>

                <Col sm={6} className="my-2">
                  {" "}
                  <div className="form-check">
                    <label>
                      <input
                        className="mx-2"
                        type="checkbox"
                        name="mhc_owned"
                        checked={propertyInfo.mhc_owned === "yes"}
                        onChange={handleFeatureChange}
                      />
                      Mhc Evaluated
                    </label>
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
                  className="btn btn-primary"
                  id="add-btn"
                  onClick={(e) => handleSubmitAddProperties(e)}>
                  Add Property
                </button>
              </div>
            </div>
          </SimpleBar>
        </OffcanvasBody>
      </Offcanvas>
    </React.Fragment>
  );
};

export default EcommerceAddProduct;
