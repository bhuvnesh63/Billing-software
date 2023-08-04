import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './billing.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


const Billing = () => {
  const params = useParams();
  const [saleOrder, setSaleOrder] = useState();
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  
  const calculateTotalPrice = () => {
    if (!saleOrder) return 0;
    return Items.reduce((total, item) => total + item.totalPrice, 0);
  };

  useEffect(() => {
    const totalPrice = saleOrder?.Items?.reduce((total, item) => total + item.totalPrice, 0);
    const discountAmount = (totalPrice * selectedDiscount) / 100;
    const calculatedGrandTotal = totalPrice - discountAmount;
    setGrandTotal(calculatedGrandTotal);
  }, [selectedDiscount, saleOrder]);

  const handleDiscountChange = (event) => {
    const selectedDiscount = parseInt(event.target.value);
    setSelectedDiscount(selectedDiscount);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/saleorder/${params.id}`)
      .then((response) => {
        setSaleOrder(response.data.sale);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, [params.id]);

  if (!saleOrder) return <div>Loading...</div>;

  const { customerName, mobileNumber, Items } = saleOrder;





  return (
    <>
      <Layout />
      <Container className='mt-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp; Dashboard/ Single Bill
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
                  <div className='table-div'>
                    <Button className='table-btn' variant='light'>
                      <IoIosCreate />
                      &nbsp;<Link to='/sale'>Create</Link>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col sm={12}>
            <div className='form-div'>
              <h5 className='gst'>GSTIN : 09AAZFG2944CIZ2 </h5>
              <div className='text-center'>
                <h4>TAX INVOICE</h4>
                <h3>M/S V K ENTERPRISES</h3>
                <p>
                  149, 0, Hanuman Nagar Near S.s.m School Linepar Majhola
                  <br />
                  Pachimi, Moradabad, Moradabad, Uttar Pradesh, 244001
                  <br />
                </p>
              </div>

              <Container>
                <Row>
                  <Col sm={6}>
                    <div className='billing-border'>
                      <p>
                        Invoice No : <span>260</span>
                      </p>
                      <p>
                        Dated : <span>01-06-2023</span>
                      </p>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className='bill-border'>
                      <p>
                        Place of Supply : <span>Uttar Pradesh (09)</span>
                      </p>
                      <p>
                        Reverse Charge : <span>N</span>
                      </p>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className='billing-border'>
                      <p className='text-bold'>Billed to :</p>
                      <p>
                        Customer Name : <span>{customerName}</span>
                      </p>
                      <p>
                        Mobile .No : <span>{mobileNumber}</span>
                      </p>
                      <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                      <p className='mb-5'>GSTIN/UIN : 1254789632145</p>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className='bill-border'>
                      <p className='text-bold'>Shipped to :</p>
                      <p>
                        Customer Name : <span>{customerName}</span>
                      </p>
                      <p>
                        Mobile .No : <span>{mobileNumber}</span>
                      </p>
                      <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                      <p className='mb-5'>GSTIN/UIN : 1254789632145</p>
                    </div>
                  </Col>

                  <Col sm={12}>
                    <Table responsive className='bill-table'>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Amount without GST</th>
                          <th>CGST Applied</th>
                          <th>SGST Applied</th>
                          <th>Price per item</th>
                          <th>Quantity</th>
                          <th>Total price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Items?.map((item) => (
                          <tr key={item._id}>
                            <td>{item.itemName}</td>
                            <td>{item.amountWithoutGST}</td>
                            <td>{item.cgstapplied}</td>
                            <td>{item.sgstapplied}</td>
                            <td>{item.pricePerItem}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className='total-bill'>
                      <p>Total : <span className='float-end total'>{calculateTotalPrice()}</span></p>
                      <Form.Group controlId="discountSelect">
                        <Form.Label>Select Discount :</Form.Label>
                        <Form.Control as="select" value={selectedDiscount} onChange={handleDiscountChange}>
                          <option value={0}>No Discount</option>
                          <option value={5}>5%</option>
                          <option value={10}>10%</option>
                          <option value={15}>15%</option>
                        </Form.Control>
                      </Form.Group>
                      <p>Discount : <span className='float-end'>{(calculateTotalPrice() * (selectedDiscount / 100)).toFixed(2)}</span></p>
                      <p>Discounted Price : <span className='float-end'>{grandTotal.toFixed(2)}</span></p>
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className='bank-details'>
                      <p className='text-bold'>Bank Details : </p>
                      <p>
                        BANK NAME :<span> PUNJAB NATIONAL BANK </span>
                      </p>
                      <p>
                        IFSC : <span>PUNB0027872 A/C NO.54789654785158458 </span>
                      </p>
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className='bank-details'>
                      <h5>Terms & Conditions</h5>
                      <p>E.& O.E.</p>
                      <p>1. Goods once sold will not be taken back.</p>
                      <p>
                        2. Interest @ 18% p.a will be charged if the payment
                        <br />
                        is not made within the Stipulated time.
                      </p>
                      <p>3. Subject to 'Uttar Pradesh' Jurisdiction only.</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>

      <br /> <br />
    </>
  );
};

export default Billing;
