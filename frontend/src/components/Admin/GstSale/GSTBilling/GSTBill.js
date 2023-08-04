import React, { useEffect, useState } from 'react'
import Layout from '../../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import "../../Billing/billing.css"
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './gstbill.css'

const GSTBilling = () => {
    const params = useParams();
    const [order, setOrder] = useState();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const calculateTotalPrice = () => {
        if (!order) return 0;
        return Items.reduce((total, item) => total + item.totalPrice, 0);
    };


    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        const discountAmount = (totalPrice * discountPercentage) / 100;
        const calculatedGrandTotal = totalPrice - discountAmount;
        setGrandTotal(calculatedGrandTotal);
    }, [discountPercentage]);

    const handleDiscountChange = (event) => {
        const selectedDiscount = parseInt(event.target.value);
        setDiscountPercentage(selectedDiscount);
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/gstorder/${params.id}`)
            .then((response) => {
                setOrder(response.data.order);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            });
    }, [params.id]);

    const handlePrint = () => {
        const printContent = document.getElementById('print-bill');
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;

    };

    if (!order) return <div>Loading...</div>;

    const { name, phoneNumber, address, email, gstNumber, Items } = order;

    return (
        <>
            <Layout />
            <Container className='mt-4' >
                <Table striped bordered hover >
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
                                    <div className="table-div">
                                        <Button className="table-btn" variant="light">
                                            <IoIosCreate />&nbsp;<Link to="/gstsale">Create</Link>
                                        </Button>

                                        ||

                                        <Button variant="primary" onClick={handlePrint}>
                                            Print Bill
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                </Row>
            </Container>


            <>

                <div className="form-div" id="print-bill">

                    <div className='form-div'>
                        <h5 className='gst' >GSTIN : 09AAZFG2944CIZ2 </h5>
                        <div className='text-center'>
                            <h4>TAX INVOICE</h4>
                            <h3>M/S V K ENTERPRISES</h3>
                            <p>149, 0, Hanuman Nagar Near S.s.m School Linepar Majhola <br />
                                Pachimi, Moradabad, Moradabad, Uttar Pradesh, 244001<br />
                            </p>
                        </div>

                        <Container>
                            <Row>
                                <Col sm={6}>

                                    <div className='billing-border'>
                                        <p>Invoice No : <span>  260</span></p>
                                        <p>Dated : <span>  01-06-2023</span></p>

                                    </div>

                                </Col>

                                <Col sm={6}>

                                    <div className='bill-border'>
                                        <p>Place of Supply : <span>  Uttar Pradesh (09)</span></p>
                                        <p>Reverse Charge : <span>  N</span></p>

                                    </div>

                                </Col>

                                <Col sm={6}>

                                    <div className='billing-border'>
                                        <p className='text-bold' >Billed to :</p>
                                        <p>Customer Name : <span>{name}</span></p>
                                        <p>Mobile Number : <span>{phoneNumber}</span></p>
                                        <p>Address : <span>{address}</span></p>
                                        <p>Email: <span>{email}</span></p>
                                        <p>GST Number: <span>{gstNumber}</span></p>
                                        <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                                        <p className='mb-5'> GSTIN/UIN : 1254789632145 </p>
                                        <br />

                                    </div>

                                </Col>

                                <Col sm={6}>
                                    <div className='bill-border'>
                                        <p className='text-bold' >Shipped to :</p>
                                        <p>Customer Name : <span>{name}</span></p>
                                        <p>Mobile Number : <span>{phoneNumber}</span></p>
                                        <p>Address : <span>{address}</span></p>
                                        <p>Email: <span>{email}</span></p>
                                        <p>GST Number: <span>{gstNumber}</span></p>
                                        <p>Amroha Gate Near Fruit Mandi Moradabad</p>

                                        <p className='mb-5'> GSTIN/UIN : 1254789632145 </p>
                                        <br />
                                    </div>

                                </Col>

                                <Table responsive className='bill-table'>
                                    <table class="table table-bordered border-secondary">
                                        <thead>
                                            <tr>
                                                {/* <th>S.N.</th> */}
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

                                    </table>
                                    <div className='total-bill'>
                                        <p>Total : <span className='float-end total'>{calculateTotalPrice()}</span></p>
                                        <Form.Group controlId="discountSelect">
                                            <Form.Label>Select Discount :</Form.Label>
                                            <Form.Control as="select" value={discountPercentage} onChange={handleDiscountChange}>
                                                <option value={0}>No Discount</option>
                                                <option value={5}>5%</option>
                                                <option value={10}>10%</option>
                                                <option value={15}>15%</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <p>Discount : <span className='float-end'>{(calculateTotalPrice() * (discountPercentage / 100)).toFixed(2)}</span></p>
                                        <p>Discounted Price : <span className='float-end'>{grandTotal.toFixed(2)}</span></p>
                                    </div>
                                </Table>
                                <div className='bank-details'>
                                    <p className='text-bold'>Bank Details : </p>
                                    <p  > BANK NAME :<span> PUNJAB NATIONAL BANK </span> </p>
                                    <p >  IFSC : <span>PUNB0027872 A/C NO.54789654785158458 </span> </p>
                                </div>
                                <div className='bank-details'>
                                    <h5>Terms & Conditions</h5>
                                    <p>E.& O.E.</p>
                                    <p>1. Goods once sold will not be taken back.</p>
                                    <p>2.Interest @ 18% p.a will be changed if the payment<br />
                                        is not made with in the Stipulated time. </p>
                                    <p>3. Subject to 'Uttar Pradesh' Jurisdiction only.</p>
                                </div>
                            </Row>
                            {/* <Button variant="primary" onClick={handlePrint}>
                            Print Bill
                        </Button> */}
                        </Container>
                    </div>
                </div>
            </>
            <br /> <br />
        </>
    )
}

export default GSTBilling;
