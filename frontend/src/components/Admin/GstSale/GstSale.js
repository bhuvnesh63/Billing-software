import React from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Form from 'react-bootstrap/Form';

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
          <hr />
        </Row>
      </Container>


      <div className="form-div">
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">

              <div class="col-md-4 position-relative">
                <label class="form-label">GST.No</label>
                <Form.Select
              //  value={gender} onChange={(e) => setGender(e.target.value)}
              //    required
                 > 
                  <option>Choose</option>
                  <option value="Male">654A45df</option>
                   <option value="Female">654A45df</option>
                </Form.Select>
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
