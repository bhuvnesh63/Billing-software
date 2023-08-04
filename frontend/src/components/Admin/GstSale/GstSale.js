import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Col, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Form from 'react-bootstrap/Form';
import "./gstsale.css"
import ModalCamp from './ModalCamp';
import axios from 'axios';

const ItemsUrl = "http://localhost:4000/api/v1/items"

const AccountUrl = "http://localhost:4000/api/v1/accounts"

const GstSale = () => {


  const [getitems, setGetItems] = useState(null);
  const [getaccounts, setGetAccounts] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [price, setPrice] = useState([]);
  const [listName, setListName] = useState(null);
  const [name, setname] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [address, setAddress] = useState([]);
  const [gstNumber, setGstNumber] = useState([]);
  const [namelist, setNamelist] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState("");
  const [selectedPrice, setSelectedPrice] = useState('');
  const [cgstPerItem, setCgstPerItem] = useState('');
  const [sgstPerItem, setSgstPerItem] = useState('');
  const [pricewithoutgst, setPricewithoutgst] = useState('');
  const [initialCgstPerItem, setInitialCgstPerItem] = useState('');
  const [initialSgstPerItem, setInitialSgstPerItem] = useState('');
  const [initialamountwithoutgst, setInitialAmountwithoutgst] = useState('');


  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data)
      console.log(response, "list")
    })
  }, [])


  useEffect(() => {
    axios.get(AccountUrl).then((response) => {
      setGetAccounts(response.data)
      console.log(response)
    })
  }, [])


  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  }
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  }

  const updatePriceWithQuantity = () => {
    const totalPrice = selectedPrice * quantity;
    setTotalPrice(totalPrice.toFixed(2));

    const newCgstPerItem = initialCgstPerItem * quantity;
    setCgstPerItem(newCgstPerItem.toFixed(2));

    const newSgstPerItem = initialSgstPerItem * quantity;
    setSgstPerItem(newSgstPerItem.toFixed(2));

    const newAmountWithoutGst = initialamountwithoutgst * quantity;
    setPricewithoutgst(newAmountWithoutGst.toFixed(2));
  };

  useEffect(() => {
    updatePriceWithQuantity();
  }, [quantity, selectedPrice]);

  const selectedPriceList = price?.map((items) => (
    <div key={items._id}>
      <p>{items.sellingPrice}</p>
      <p>{items.cgstPerItem}</p>
      <p>{items.sgstPerItem}</p>
      <p>{items.pricewithoutgst}</p>
    </div>
  ));

  const getItemPrice = (selectedItemName) => {
    const selectedItemObj = getitems?.items?.find(
      (items) => items.itemName === selectedItemName
    );

    if (selectedItemObj) {
      setSelectedPrice(selectedItemObj.sellingPrice);
      setInitialCgstPerItem(selectedItemObj.cgstPerItem);
      setCgstPerItem(selectedItemObj.cgstPerItem);
      setInitialSgstPerItem(selectedItemObj.sgstPerItem);
      setSgstPerItem(selectedItemObj.sgstPerItem);
      setInitialAmountwithoutgst(selectedItemObj.pricewithoutgst);
      setPricewithoutgst(selectedItemObj.pricewithoutgst);
    }
  };

  const selectedList = namelist?.map((accounts) => (
    <div key={accounts._id}>
      <p>{accounts.name}</p>
      <p>{accounts.phoneNumber}</p>
      <p>{accounts.email}</p>
      <p>{accounts.address}</p>
      <p>{accounts.gstNumber}</p>
    </div>
  ));

  const getList = (selectedItemName) => {
    const selectedItemObj = getaccounts?.accounts?.find(
      (account) => account.name === selectedItemName,
    );

    if (selectedItemObj) {
      setname(selectedItemObj.name);
      setPhoneNumber(selectedItemObj.phoneNumber);
      setEmail(selectedItemObj.email);
      setAddress(selectedItemObj.address);
      setGstNumber(selectedItemObj.gstNumber);

    }
  };
  const submitform = async (event) => {
    event.preventDefault();
    try {

      const saleOrderData = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        gstNumber: gstNumber,
        Items: [
          {
            itemName: itemName,
            pricePerItem: selectedPrice,
            quantity: quantity.toString(),
            totalPrice: parseFloat(totalPrice),
            amountWithoutGST: parseFloat(pricewithoutgst),
            cgstapplied: parseFloat(cgstPerItem),
            sgstapplied: parseFloat(sgstPerItem),
          },
        ],
      };


      const response = await axios.post('http://localhost:4000/api/v1/gstorder/new', saleOrderData);

      // console.log('Sale order data saved:', response.data);


    } catch (error) {
      console.log('Error saving sale order data:', error.response);
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
                  <AiFillDashboard /> &nbsp;Dasboard / GST Sale
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
                  onChange={(e) => {
                    // setItemName(e.target.value);
                    getList(e.target.value);
                  }}
                >
                  <option>Choose</option>
                  {getaccounts?.accounts?.map((account) => (
                    <option >{account.name}</option>
                  ))}

                </Form.Select>
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  value={name}
                />
                {selectedList}
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Phone No</label>
                <input
                  type="text"
                  class="form-control"
                  value={phoneNumber}
                />

              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Email ID</label>
                <input
                  type="text"
                  class="form-control"
                  value={email}
        
                />

              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  value={address}
                />

              </div>

              <div class="col-md-4 mb-5 position-relative">
                <label className="label">GST No</label>
                <input
                  type="text"
                  class="form-control"
                  value={gstNumber}
            
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

              </div>

              <div className='col-md-2 position-relative'>
                <label className='label'>CGST Applied</label>
                <input
                  type='text'
                  className='form-control'
                  value={cgstPerItem}
                  readOnly
                />

              </div>

              <div className='col-md-2 position-relative'>
                <label className='label'>SGST Applied</label>
                <input
                  type='text'
                  className='form-control'
                  value={sgstPerItem}
                  readOnly
                />

              </div>

              <div className='col-md-2 position-relative'>
                <label className='label'>Price per item</label>
                <input
                  type='text'
                  className='form-control'
                  value={selectedPrice}
                  readOnly
                />

              </div>

              <div className="col-md-2 position-relative">
                <label className="label">Quantity</label>
                <div className="cart-buttons">
                  <div className="quantity-buttons">
                    <span className="increment-buttons" onClick={decrement}>-</span>
                    <span className="increment-buttons">{quantity}</span>
                    <span className="increment-buttons" onClick={increment}>+</span>
                  </div>
                </div>
              </div>

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

export default GstSale
