import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row,Col , Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Form from 'react-bootstrap/Form';
import "./gstsale.css"
import ModalCamp from './ModalCamp';
import axios from 'axios';


const ItemsUrl = "http://localhost:4000/api/v1/items"



const GstSale = () => {
  const [getitems, setGetItems] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [itemName, setItemName] = useState(null);
  const [price, setPrice] = useState([]);
  





  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data)
      console.log(response,"list")
    })
  }, [getitems])


  const selectedPriceList = price?.map((items) => (
    <div key={items.sellingPrice
    }>
      <p>{items.sellingPrice
}</p>
    </div>
  ));

  const getItemPrice = (selectedItemName) => {
    const selectedItemObj = getitems?.items?.find(
      (items) => items.itemName === selectedItemName
    );

    if (selectedItemObj) {
      setSelectedPrice(selectedItemObj.sellingPrice
        );
    }
  };




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
                      <IoIosCreate />&nbsp;<Link to="/gstsale-list">Go Back</Link>
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
           <label className="label">Item Name </label>
       
                <Form.Select
                 onChange={(e) => {
                  setItemName(e.target.value);
                  getItemPrice(e.target.value);
                }}
              
                 > 
                  <option>Choose</option>
                  {getitems?.items?.map((items) => (
                    
                  <option key={items._id} 
                  value={items.itemName}>{items.itemName}</option>

                  ))}

                </Form.Select>

           </Col>
           
           {/* <Col sm={2}> */}

            <div className='col-md-2 position-relative'>
                <label className='label'>Price per item</label>
                <input
                  type='text'
                  className='form-control'
                  value={selectedPrice}
                  readOnly
                />
                {selectedPriceList}
            </div>




              <Col sm={2}>
              <p className='head-quantity'  >Quantity</p>
              <div className="Opretor d-flex" >
              
              <button
                type="button"
                className='decrease'
                
              >
                -
              </button>
              <p className='quantity' > 1
                {/* {itemQuantities[item.Item_Name] || 1} */}
              </p>
              <button
                type="button"
                className='increase float-end'
           
              >
                +
              </button>
          
            </div>


                {/* <label className="label">Quantity </label>
                <input
                  type="text"
                  class="form-control"
               
                /> */}
                </Col>


              <Col sm={2}>
                <label className="label">Total Price </label>
                <input
                  type="text"
                  class="form-control"
           
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
