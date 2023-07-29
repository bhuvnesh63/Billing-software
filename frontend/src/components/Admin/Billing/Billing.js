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
      <Container className='mt-4' >
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>

              <h5>
                <AiFillDashboard /> &nbsp; Dashboard/ Bill
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
                      <IoIosCreate />&nbsp;<Link to="/res-billing">Create</Link>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>

        </Row>
      </Container>


      <div className="form-div">


        <h5 className='gst' >GSTIN : 09AAZFG2944CIZ2 </h5>
        <div className='text-center'>
          <h4>TAX INVOICE</h4>
          <h3>M/S V K ENTERPRISES</h3>
          <p>149, 0, Hanuman Nagar Near S.s.m School Linepar Majhola <br/>
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
                <p>Iqbal Brothers</p>
                <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                <br /><br />
                <p> GSTIN/UIN : 1254789632145 </p>

              </div>


            </Col>

            <Col sm={6}>

              <div className='bill-border'>
                <p className='text-bold' >Shipped to :</p>
                <p>Iqbal Brothers</p>
                <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                <br /><br />
                <p> GSTIN/UIN : 1254789632145 </p>

              </div>


            </Col>

            <Table responsive className='bill-table'>
              <table class="table table-bordered border-secondary">
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Item name</th>
                    <th>Qty.</th>
                    <th>Price</th>
                    <th>CGST Amount</th>
                    <th>Amount</th>


                    {/* <th>HSN/SAC/Code</th> */}
                    {/* <th>Unit</th> */}
                    {/* <th>CGST Rate</th> */}                   
                    {/* <th>SGST Rate</th> */}
                    {/* <th>SGST Amount</th> */}
                  
                  </tr>
                  </thead>


                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>Mug</td>
                      <td>500</td>
                      <td>2222</td>
                      <td>700.00</td>
                      <td>826.00</td>
                     


                    </tr>
                  </tbody>


                  
              </table>
              <div className='total-bill'>
              <p >Grand Total <span className='float-end'>826.00</span></p></div>
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
                <p>2.Interest @ 18% p.a will be changed if the payment<br/>
                 is not made with in the Stipulated time. </p>
                 <p>3. Subject to 'Uttar Pradesh' Jurisdiction only.</p>


              </div>




           










          </Row>
        </Container>
      </div>

    </>
  )
}

export default Billing
