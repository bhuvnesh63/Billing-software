import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './billing.css';
import axios from 'axios';

const Billing = () => {
  const params = useParams();
  const [saleOrder, setSaleOrder] = useState(null);

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

  // Function to calculate total price for each item
  const calculateTotalPrice = (item) => {
    const { amountWithoutGST, cgstapplied, sgstapplied, quantity } = item;
    // Convert the values to numbers (assuming they are in string format)
    const amount = parseFloat(amountWithoutGST);
    const cgst = parseFloat(cgstapplied);
    const sgst = parseFloat(sgstapplied);
    const qty = parseInt(quantity);

    // Calculate total price for the item
    const totalPrice = amount + (amount * (cgst + sgst)) / 100;
    return totalPrice * qty;
  };

  // Calculate grand total
  const grandTotal = Items.reduce(
    (total, item) => total + calculateTotalPrice(item),
    0
  );

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
                            {/* Display the calculated total price for each item */}
                            <td>{calculateTotalPrice(item).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className='total-bill'>
                      {/* Display the calculated grand total */}
                      <p>
                        Grand Total <span className='float-end'>{grandTotal.toFixed(2)}</span>
                      </p>
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
