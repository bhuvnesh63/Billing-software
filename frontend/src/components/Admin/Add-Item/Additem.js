import React, { useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Form, Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import axios from 'axios';

const Additem = () => {

  const [itemName, setitemName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [purchasingPrice, setpurchasingPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();


  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/item/new", {
        "itemName": itemName,
        "sellingPrice": sellingPrice,
        "purchasingPrice": purchasingPrice,
        "stock": stock
      })
      // toast.success("Item Add Successfully");
      navigate("/itemlist");

    } catch (error) {
      console.log(error.response);

    }
  }

  return (
    <>

      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dasboard / Add Item
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
                      <IoIosCreate />&nbsp;<Link to="/itemlist">Go Back</Link>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>

        </Row>
      </Container>


      <div className="form-div">
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Add Item </h5>
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div class="col-md-4 position-relative">
                <label className="label">Item Name</label>
                <input
                  type="text"
                  class="form-control"
                  value={itemName}
                  onChange={(e) => setitemName(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Selling Price</label>
                <input
                  type="number"
                  class="form-control"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Purchase Price</label>
                <input
                  type="number"
                  class="form-control"
                  value={purchasingPrice}
                  onChange={(e) => setpurchasingPrice(e.target.value)}
                  required
                />
              </div>


              <div class="col-md-4 position-relative">
                <label className="label">Stock</label>
                <input
                  type="number"
                  class="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={(event) => submitform(event)}
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

export default Additem
