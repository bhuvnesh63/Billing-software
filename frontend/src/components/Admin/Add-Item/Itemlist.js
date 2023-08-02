import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios'

const ItemsUrl = "http://localhost:4000/api/v1/items"

const Itemlist = ({ items }) => {
  const [getitems, setGetItems] = useState(null);

  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data)
      console.log(response)
    })
  }, [getitems])

  const deleteData = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:4000/api/v1/item/${id}`).then(response => {
      // alert("Item has been deleted successfully")
      // toast.success("Item deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }

  if (!getitems) return null;
  return (
    <>
      <Layout />
      <Container className='main-col' >
        <Table striped bordered hover className='main-table'>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Item-Details</h5></th>
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
                      <IoIosCreate />&nbsp;<Link to="/additem">Create</Link>
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

                    <th>Item Name</th>
                    <th>MRP</th>
                    <th>Total Amount</th>
                    <th>Stock</th>
                    <th>CGST</th>
                    <th>SGST</th>
                    <th>CGST Amount/pcs</th>
                    <th>SGST Amount/pcs</th>
                    <th>Purchase Price</th>
                    <th>Action Edit</th>
                    <th>Action View</th>
                  </tr>
                </thead>

                <tbody>
                  {getitems?.items?.map((items) => (
                    <tr>

                      <td>{items.itemName}</td>
                      <td>{items.sellingPrice}</td>
                      <td>{items.totalamount}</td>
                      <td>{items.stock}</td>
                      <td>{items.cgst}</td>
                      <td>{items.sgst}</td>
                      <td>{items.cgstPerItem}</td>
                      <td>{items.sgstPerItem}</td>
                      <td>{items.PurchasingPrice}</td>

                      <td>

                        <Link to={`/edititem/${items._id}`}>
                          <Button className='table-btn' 
                          variant="light" >
                            &#9998;Edit
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button className='table-btn'
                         variant="light" onClick={(e) => 
                          { deleteData(items._id) }} value={"Delete"}
                        >
                        <span className='delete-icon'>&#x2717;</span>Delete
                        </Button>
                      </td>
                      {/* <td>
                      <Button className='table-btn' variant="light"
                        onClick={() => handleModel(items)}
                      >
                        &#128065;View
                      </Button>
                    </td>
                    {open && (
                      <ModalComp
                        open={open}
                        setOpen={setOpen}
                        {...user}
                      />
                    )} */}
                    
                    </tr>
                  ))}

                </tbody>
              </table>
            </Table>
          </Row>
        </Container>

      </div>








    </>
  )
}

export default Itemlist;
