import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import "./sale.css";
import axios from 'axios';

const ItemsUrl = "http://localhost:4000/api/v1/items";

const Sale = () => {
  const [getitems, setGetItems] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [items, setItems] = useState([
    {
      itemName: "",
      pricePerItem: "",
      quantity: "",
      totalPrice: "",
    },
  ]);
  const [service, setService] = useState(null);
  const [selectedServiceCharge, setSelectedServiceCharge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data);
      console.log(response, "list");
    });
  }, [getitems]);

  const selectedChargeList = getitems?.items?.map((item) => (
    <div key={item.sellingPrice}>
      <p>{item.sellingPrice}</p>
    </div>
  ));

  const getServiceCharge = (selectedService) => {
    const selectedServiceObj = getitems?.items?.find(
      (item) => item.itemName === selectedService
    );

    if (selectedServiceObj) {
      setSelectedServiceCharge(selectedServiceObj.sellingPrice);
    }
  };

  const addMoreFields = () => {
    setItems([...items, { itemName: "", pricePerItem: "", quantity: "", totalPrice: "" }]);
  };

  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/saleorder/new", {
        customerName: customerName,
        mobileNumber: mobileNumber,
        items: items,
      });
      navigate("/salelist");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Layout />
      <Container className='mt-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dashboard / Add Sale
                </h5>
              </th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div>
                    <Button className="table-btn" variant="light">
                      <IoIosCreate />&nbsp;<Link to="/salelist">Go Back</Link>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
        </Row>
      </Container>
      <div className="form-div">
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div className="col-md-4 position-relative">
                <label className="label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-5 position-relative">
                <label className="label">Mobile No</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              <hr />
              <h5>Product Details</h5>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <Col sm={6}>
                    <label className="label">Item Name</label>
                    <Form.Select
                      onChange={(e) => {
                        const selectedItem = getitems?.items.find((item) => item.itemName === e.target.value);
                        getServiceCharge(e.target.value);
                        setItems((prevItems) => {
                          const newItems = [...prevItems];
                          newItems[index].itemName = e.target.value;
                          newItems[index].pricePerItem = selectedItem?.sellingPrice || "";
                          newItems[index].totalPrice = (parseFloat(selectedItem?.sellingPrice) * parseFloat(newItems[index].quantity)).toFixed(2) || "";
                          return newItems;
                        });
                      }}
                    >
                      <option>Choose</option>
                      {getitems?.items?.map((item) => (
                        <option key={item._id} value={item.itemName}>{item.itemName}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col sm={2}>
                    <label className="label">Price per item</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.pricePerItem}
                      readOnly
                    />
                  </Col>
                  <Col sm={2}>
                    <label className="label">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) => {
                        setItems((prevItems) => {
                          const newItems = [...prevItems];
                          newItems[index].quantity = e.target.value;
                          newItems[index].totalPrice = (parseFloat(newItems[index].pricePerItem) * parseFloat(e.target.value)).toFixed(2) || "";
                          return newItems;
                        });
                      }}
                      required
                    />
                  </Col>
                  <Col sm={2}>
                    <label className="label">Total Price</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.totalPrice}
                      // readOnly
                    />
                  </Col>
                </React.Fragment>
              ))}
              <center>
                <Button
                  className="float-end"
                  variant="success"
                  type="button"
                  onClick={addMoreFields}
                >
                  Add more
                </Button>
              </center>
              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={submitform}
                >
                  Submit
                </Button>
              </center>
            </form>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Sale;
