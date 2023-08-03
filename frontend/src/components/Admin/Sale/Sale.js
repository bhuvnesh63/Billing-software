import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import "./sale.css";
import axios from 'axios';



const ItemsUrl = "http://localhost:4000/api/v1/items"


const Sale = () => {
  const [getitems, setGetItems] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState("");
  const [selectedPrice, setSelectedPrice] = useState('');
  const [cgstPerItem, setCgstPerItem] = useState('');
  const [sgstPerItem, setSgstPerItem] = useState('');
  const [pricewithoutgst, setPricewithoutgst] = useState('');
  const [totalGST, setTotalGST] = useState('');
  // const [service, setService] = useState(null);
  const [price, setPrice] = useState([]);



  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data)
      console.log(response, "list")
    })
  }, [getitems])

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  }
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  }

  const selectedPriceList = price?.map((items) => (
    <div key={items._id}>
      <p>{items.sellingPrice}</p>
      <p>{items.cgstPerItem}</p>
      <p>{items.sgstPerItem}</p>
      <p>{items.pricewithoutgst}</p>
      <p>{items.totalGST}</p>


    </div>
  ));

  const getItemPrice = (selectedItemName) => {
    const selectedItemObj = getitems?.items?.find(
      (items) => items.itemName === selectedItemName
    );

    if (selectedItemObj) {
      setSelectedPrice(selectedItemObj.sellingPrice);
      setCgstPerItem(selectedItemObj.cgstPerItem);
      setSgstPerItem(selectedItemObj.sgstPerItem);
      setPricewithoutgst(selectedItemObj.pricewithoutgst);
      setTotalGST(selectedItemObj.totalGST);
    }
  };



  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/saleorder/new", {
        "customerName": customerName,
        "mobileNumber": mobileNumber,
        "itemName": itemName,
        "pricePerItem": selectedPrice,
        "quantity": quantity,
        "totalPrice": totalPrice,

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

              <Col sm={2}>
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
                <label className='label'>Amount without GST</label>
                <input
                  type='text'
                  className='form-control'
                  value={pricewithoutgst}
                  readOnly
                />
                {selectedPriceList}
              </div>

              <div className='col-md-2 position-relative'>
                <label className='label'>CGST Applied</label>
                <input
                  type='text'
                  className='form-control'
                  value={cgstPerItem}
                  readOnly
                />
                {selectedPriceList}
              </div>
              <div className='col-md-2 position-relative'>
                <label className='label'>SGST Applied</label>
                <input
                  type='text'
                  className='form-control'
                  value={sgstPerItem}
                  readOnly
                />
                {selectedPriceList}
              </div>


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


              {/* <label className="label">Price per item </label>
           <input
                  type="text"
                  class="form-control"
                  value={selectedServiceCharge}
                />
                {selectedChargeList} */}

              {/* </Col> */}
              <div className='col-md-2 position-relative'>
                <label className='label'>Quantity</label>
                <div className="cart-buttons">

                  <div className="quantity-buttons">
                    <span onClick={decrement}>-</span>
                    <span>{quantity}</span>
                    <span onClick={increment}>+</span>
                  </div>
                </div>
              </div>
              {/* <Col sm={2}>
                <label className="label">Quantity </label>
                <input
                  type="text"
                  class="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                /></Col> */}

              <Col sm={2}>
                <label className="label">Total Price </label>
                <input
                  type="text"
                  class="form-control"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  required
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