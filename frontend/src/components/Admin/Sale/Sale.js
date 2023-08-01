import React, { useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import {  Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import "./sale.css";
import axios from 'axios';

const Sale = () => {
  const [customerName, setCustomerName]= useState("");
  const [mobileNumber, setMobileNumber]= useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [pricePerItem, setPricePerItem] = useState('');


  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/saleorder/new", {
        "customerName": customerName,
        "mobileNumber": mobileNumber,
        // "purchasingPrice": purchasingPrice,
        // "stock": stock
      })
      // toast.success("Item Add Successfully");
      // navigate("/itemlist");

    } catch (error) {
      console.log(error.response);

    }
  }
  return (
    <>

      <Layout />
      <Container className='mt-4'>
      
        <Table striped bordered hover  >
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dasboard / Add Sale
                </h5>
              </th>
            </tr>
          </thead>
        </Table>
      
        <Row>
          <Table striped bordered hover >
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
              <div class="col-md-4 position-relative">
                <label className="label">Customer Name</label>
                <input
                  type="text"
                  class="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                />
              </div>

              <div class="col-md-4 mb-5 position-relative">
                <label className="label">Mobile No</label>
                <input
                  type="text"
                  class="form-control"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                />
              </div>
    

           <hr></hr>

           <h5>Product Details</h5>

           <Col sm={6}>
           <label className="label">Item Name </label>
       
                <Form.Select
              //  value={gender} onChange={(e) => setGender(e.target.value)}
              //    required
                 > 
                  <option>Choose</option>
                  <option value="Male">Chips</option>
                   <option value="Female">Kurkure</option>

                </Form.Select>

           </Col>
           
           <Col sm={2}>
             <label className="label">Price per item </label>
           <input
                  type="text"
                  class="form-control"
                // value={service_Name}
                // onChange={(e) => setService_Name(e.target.value)}
                // required
                /></Col>
           
           <Col sm={2}> 
           <label className="label">Quantity </label>
           <input
                  type="text"
                  class="form-control"
                // value={service_Name}
                // onChange={(e) => setService_Name(e.target.value)}
                // required
                /></Col>
           
           <Col sm={2}> 
           <label className="label">Total Price </label>
           <input
                  type="text"
                  class="form-control"
                // value={service_Name}
                // onChange={(e) => setService_Name(e.target.value)}
                // required
                /></Col>

                <div>
                <Button
                  className="float-end"
                  variant="success"
                  type="submit"
                onClick={(event) => submitform(event)} // Pass the event parameter
                >
                  Add more
                </Button>

                </div>


              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                // onClick={(event) => submitform(event)} // Pass the event parameter
                >
                  Submit
                </Button>
              </center>
            </form>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Sale
