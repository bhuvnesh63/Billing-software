import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link , useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillDashboard} from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './sale.css';
import axios from 'axios';

const ItemsUrl = 'http://localhost:4000/api/v1/items';
const SaleOrderUrl = 'http://localhost:4000/api/v1/saleorder/new'; 


const Sale = () => {
  const [getitems, setGetItems] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [cgstPerItem, setCgstPerItem] = useState('');
  const [sgstPerItem, setSgstPerItem] = useState('');
  const [pricewithoutgst, setPricewithoutgst] = useState('');
  const [initialCgstPerItem, setInitialCgstPerItem] = useState('');
  const [initialSgstPerItem, setInitialSgstPerItem] = useState('');
  const [initialamountwithoutgst, setInitialAmountwithoutgst] = useState('');
  const navigate = useNavigate();
  const [totalGST, setTotalGST] = useState('');

  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data);
      console.log(response, 'list');
    });
  }, []);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };



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


  const getItemPrice = (selectedItemName) => {
    const selectedItemObj = getitems?.items?.find((items) => items.itemName === selectedItemName);

    if (selectedItemObj) {
      setSelectedPrice(selectedItemObj.sellingPrice);
      setInitialCgstPerItem(selectedItemObj.cgstPerItem); 
      setCgstPerItem(selectedItemObj.cgstPerItem); 
      setInitialSgstPerItem(selectedItemObj.sgstPerItem); 
      setSgstPerItem(selectedItemObj.sgstPerItem);
      setPricewithoutgst(selectedItemObj.pricewithoutgst);
      setInitialAmountwithoutgst(selectedItemObj.pricewithoutgst); 
      setTotalGST(selectedItemObj.totalGST);
    }
  };

  const submitform = async (event) => {
    event.preventDefault();
    try {

      const saleOrderData = {
        customerName: customerName,
        mobileNumber: mobileNumber,
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

  
      const response = await axios.post(SaleOrderUrl, saleOrderData);
      navigate("/billlist");
      // console.log('Sale order data saved:', response.data);


    } catch (error) {
      console.log('Error saving sale order data:', error.response);
    }
  };


  return (
    <>
      <Layout />
      <Container className="mt-4">
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

              <hr></hr>

              <h5>Product Details</h5>

              <Col sm={2}>
                <label className="label">Item Name</label>

                <Form.Select onChange={(e) => {
                  setItemName(e.target.value);
                  getItemPrice(e.target.value);
                }}
                >
                  <option>Choose</option>
                  {getitems?.items?.map((items) => (
                    <option key={items._id} value={items.itemName}>{items.itemName}</option>
                  ))}
                </Form.Select>

              </Col>

              <div className="col-md-2 position-relative">
                <label className="label">Amount without GST</label>
                <input
                  type="text"
                  className="form-control"
                  value={pricewithoutgst}
                  readOnly
                />
              </div>

              <div className="col-md-2 position-relative">
                <label className="label">CGST Applied</label>
                <input
                  type="text"
                  className="form-control"
                  value={cgstPerItem}
                  readOnly
                />
              </div>

              <div className="col-md-2 position-relative">
                <label className="label">SGST Applied</label>
                <input
                  type="text"
                  className="form-control"
                  value={sgstPerItem}
                  readOnly
                />
              </div>

              <div className="col-md-2 position-relative">
                <label className="label">Price per item</label>
                <input
                  type="text"
                  className="form-control"
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
                <label className="label">Total Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  required
                />
              </Col>

            
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
  );
};

export default Sale;
