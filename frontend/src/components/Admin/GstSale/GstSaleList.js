import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios'



const AccountUrl = "http://localhost:4000/api/v1/gstorders"


const GstSaleList = () => {

  const navigate = useNavigate();
  const [gstSaleList, setGstSaleList] = useState(null);

  useEffect(() => {
    axios.get(AccountUrl).then((response) => {
      setGstSaleList(response.data)
      console.log(response)
    })
  }, [gstSaleList])


  const deleteData = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:4000/api/v1/gstorder/${id}`).then(response => {
      // alert("Item has been deleted successfully")
      // toast.success("Item deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }
  if (!gstSaleList) return null;

  return (
   <>
   <Layout />
   <Container  className='main-col' >
        <Table striped bordered hover >
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Add-Account-Details</h5></th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className='table-div' >

                    <Button className='table-btn' variant="light" >
                      <IoIosCreate />&nbsp;<Link to="/gstsale">Create</Link>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
         
        </Row>
      </Container>


      <div className='form-div' >
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Item Details</h5>
        <Container>
          <Row>




            <Table responsive>
              <table class="table table-bordered border-secondary">
                <thead>
                  <tr>

                    <th>Customer name</th>
                    <th>Phone No</th>
                    <th>Email ID</th>
                    <th>Address</th>
                    <th>GST No</th>
                    <th>Stock </th>
                    <th>Price per item</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action Edit</th>
                    <th>Action View</th>


                  </tr>
                </thead>
                <tbody>

                  {/* {get?.ser?.map((items) => ( */}
                    <tr>
                        <td>Depanshu</td>
                        <td>8796541235</td>
                        <td>depanshu@gmail.com</td>
                        <td>Delhi</td>
                        <td>265A45BB7</td>
                        <td>500</td>
                        <td>200</td>
                        <td>500</td>
                        <td>2000</td> 
                       
                        
                       
                      {/* <td>{items.Service_Name}</td>
                      <td>{items.Service_Charge}</td> */}
                  

                      <td>
                        {/* <Link to={`/serviceEdit/${items._id}`}> */}
                        <Button className='table-btn'
                         variant="light" >
                          &#9998;Edit</Button> 
                          {/* </Link> */}
                          </td>

                      <td>
                        <Button className='table-btn' variant="light" 
                    //   onClick={(e) => { deleteData(items._id) }}
                       value={"Delete"} >
                           <span className='delete-icon'>&#x2717;</span>Delete
                       </Button>
                       </td>
                      
                    </tr>


                  {/* ))} */}



                </tbody>
              </table>
            </Table>
          </Row>
        </Container>

      </div>
   
   
   </>

  )
}

export default GstSaleList
