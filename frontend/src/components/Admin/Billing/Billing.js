import React from 'react'
import Layout from '../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import "./billing.css"




const Billing = () => {


  return (
    <>

    <Layout />
      <Container className="main-col">
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>

              <h5>
                <AiFillDashboard /> &nbsp; Dashboard/ Bill
              </h5>

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
                      <IoIosCreate />&nbsp;<Link to="/res-billing">Create</Link>
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
            <Col sm={4}>
              <div className="billing-cards-2" id="billing-card">
                <h3 className="res-name text-style">Billing</h3>
                <h5 className='text-style'>Phone Number: <span>8796541234</span></h5>
                <h5 className='text-style'>Address: <span>Mansrowar</span></h5>
                <h5 className='text-style'>Gst Number: <span>1</span></h5>
               
                <Table>
                  <table className="table table-bordered border-secondary">
                    <thead>
                      <tr className='text-style'>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>item</td>
                      <td>200</td>
                      <td>2</td>
                      <td>200</td>
                      {/* {order.Items.map((item) => (
                        <tr key={item._id} className='text-style'>
                          <td>{item.Item_Name}</td>
                          <td>{item.price}</td>
                          <td>{item.Quantity}</td>
                          <td>{item.price * item.Quantity}</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                  <hr />
                  <h5 className="mt-2 text-style">
                    Total Price: <span className="float-end">
                      {/* {calculateTotal(order.Items)} */}
                      </span>
                  </h5>
                  <h5 className="mt-2 text-style">GST (5%): <span className="float-end">
                    {/* {gstAmount.toFixed(2)} */}
                    </span></h5>
                  <h5 className="mt-2 text-style">Total (incl. GST): <span className="float-end">
                    {/* {(calculateTotal(order.Items) + gstAmount).toFixed(2)} */}
                    </span></h5>
                  <h5 className='text-style'>Payment Method <span className="float-end">
                    {/* {paymentMethod} */}
                    </span></h5>
                </Table>
                <div>
                <Button className="table-btns d-flex" variant="light" 
                // onClick={printBill}
                >
                    &#128065;Print Bill
                  </Button>
                  <span className="float-end">
                    <div className="QR-img-box">
                      <img className="fill-img-box" src="/img/qr_img.png" alt="QR Code" />
                    </div>
                  </span>
                </div>
              </div>
            </Col>
           
            <Col sm={4}>
              {/* Payment Method Form */}
              <div className="payment-form">
                <h4 className='text-style'> Select Payment Method:</h4>
                <select className='select'
                //  onChange={(e) => setPaymentMethod(e.target.value)}
                 >
                  <option className='text-style'  
                  // value={paymentMethod}
                  >Choose</option>
                  <option value="cash" className='text-style'>Cash</option>
                  <option value="UPI" className='text-style'>UPI</option>
                </select>
              </div>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
      </div>
    
    </>
  )
}

export default Billing
