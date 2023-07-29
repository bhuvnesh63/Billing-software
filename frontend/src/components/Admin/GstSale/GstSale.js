import React, { useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row,Col , Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Form from 'react-bootstrap/Form';
import "./gstsale.css"
import ModalCamp from './ModalCamp';

const GstSale = () => {




  return (
    <>

      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dasboard / Add Stock
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
                  <div className="table-div">
                    <Button className="table-btn" variant="light">
                      <IoIosCreate />&nbsp;<Link to="/service-list">Go Back</Link>
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
                <label class="label">Customer name</label>
                <Form.Select
                //  value={gender} onChange={(e) => setGender(e.target.value)}
                //    required
                >
                  <option>Choose</option>
                  <option value="Male">Rr infosoft</option>
                  <option value="Female">chetu</option>
                </Form.Select>
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">Name</label>
                <input
                  type="text"
                  class="form-control"
                // value={service_Name}
                // onChange={(e) => setService_Name(e.target.value)}
                // required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Phone No</label>
                <input
                  type="text"
                  class="form-control"
                // value={service_Charge}
                // onChange={(e) => setService_Charge(e.target.value)}
                // required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Email ID</label>
                <input
                  type="text"
                  class="form-control"
                // value={service_Charge}
                // onChange={(e) => setService_Charge(e.target.value)}
                // required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Address</label>
                <input
                  type="text"
                  class="form-control"
                // value={service_Charge}
                // onChange={(e) => setService_Charge(e.target.value)}
                // required
                />
              </div>

              <div class="col-md-4 mb-5 position-relative">
                <label className="label">GST No</label>
                <input
                  type="text"
                  class="form-control"
                // value={service_Charge}
                // onChange={(e) => setService_Charge(e.target.value)}
                // required
                />
              </div>


              <hr></hr>

              <h5>Product Details</h5>

              <Col sm={6}>
                <label className="label">Stock </label>

                <Form.Select
                //  value={gender} onChange={(e) => setGender(e.target.value)}
                //    required
                >
                  <option>Choose</option>
                  <option value="Male">500</option>
                  <option value="Female">400</option>
                  <option value="Female">300</option>
                  <option value="Female">700</option>
                  <option value="Female">800</option>

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
                // onClick={(event) => submitform(event)} // Pass the event parameter
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

export default GstSale
