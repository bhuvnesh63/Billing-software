import React from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Form, Link } from 'react-router-dom'
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import "./sale.css"


const Sale = () => {


  return (
    <>

      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="table-div">
                    <Button className="table-btn" variant="light">
                      <IoIosCreate />&nbsp;<Link to="/salelist">Go Back</Link>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
          <hr />
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

              <div class="col-md-4 position-relative">
                <label className="label">Mobile No</label>
                <input
                  type="text"
                  class="form-control"
                // value={service_Charge}
                // onChange={(e) => setService_Charge(e.target.value)}
                // required
                />
              </div>

              {/* <div class="col-md-4 position-relative">


                <label class="form-label">Category</label>
                <Form.Select */}
                {/* // value={gender} onChange={(e) => setGender(e.target.value)}
                // required */}
                {/* > */}
                  {/* <option>Choose</option> */}
                  {/* <option value="Male">Male</option> */}
                  {/* <option value="Female">Female</option>
                </Form.Select>
              </div> */}

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
