import React from 'react'
import Layout from '../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import {  Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import "./sale.css"



const Sale = () => {


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
                // value={service_Name}
                // onChange={(e) => setService_Name(e.target.value)}
                // required
                />
              </div>

              <div class="col-md-4 mb-5 position-relative">
                <label className="label">Mobile No</label>
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

export default Sale
