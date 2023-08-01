import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Row, Table, Button } from 'react-bootstrap'
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Form from 'react-bootstrap/Form';
import { IoIosCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../Header/Layout'

const EditItem = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [specificItem, setSpecificItem] = useState("");
    const [itemName, setitemName] = useState(specificItem.itemName);
    const [sellingPrice, setSellingPrice] = useState(specificItem.sellingPrice);
    const [purchasingPrice, setpurchasingPrice] = useState(specificItem.purchasingPrice);
    const [stock, setStock] = useState(specificItem.stock);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/item/${params.id}`).then((response) => {
            setSpecificItem(response.data);
            setitemName(response.data.item.itemName);
            setSellingPrice(response.data.item.sellingPrice);
            setpurchasingPrice(response.data.item.purchasingPrice);
            setStock(response.data.item.stock);

        })
    }, [])


    const submitform = (event) => {
        event.preventDefault();
        try {
            axios.put(`http://localhost:4000/api/v1/item/${params.id}`, {
                "itemName": itemName,
                "sellingPrice": sellingPrice,
                "purchasingPrice": purchasingPrice,
                "stock": stock,
            })
            // toast.success("Item Updated Succesfully")
            navigate("/itemlist")
        } catch (error) {
            console.log(error.response)

        }
    }
    console.log(specificItem)

    return (
        <>

            <Layout />
            <Container style={{ width: "90%", marginTop: "20px" }} >
                <Table striped bordered hover className='main-table'>
                    <thead>
                        <tr>
                            <th><h5><AiFillDashboard /> &nbsp;Dasboard / Edit Item</h5></th>
                        </tr>
                    </thead>
                </Table>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <div className='table-div'>

                                        <Button className='table-btn' variant="light" >
                                            <IoIosCreate />&nbsp;<Link to="/item-list">Go Back</Link>
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                    <hr />
                </Row>
            </Container>
            {/* form section start */}
            <div className='form-div' >
                <Container>
                    <Row>

                        <form className="row g-4 p-3 registration-form" >
                            <div class="col-md-4 position-relative">
                                <label className="label">Item Name</label>
                                <input type="text" className="form-control"
                                    value={itemName} onChange={(e) =>
                                        setitemName(e.target.value)} />
                            </div>
                            <div class="col-md-4 position-relative">
                                <label className="label">Selling Price</label>
                                <input type="text" className="form-control"
                                    value={sellingPrice} onChange={(e) =>
                                        setSellingPrice(e.target.value)} />
                            </div>
                            <div class="col-md-4 position-relative">
                                <label className="label">Purching Price</label>
                                <input type="text" className="form-control"
                                    value={purchasingPrice} onChange={(e) =>
                                        setpurchasingPrice(e.target.value)} />
                            </div>
                            <div class="col-md-4 position-relative">
                                <label className="label">Stock</label>
                                <input type="text" className="form-control"
                                    value={stock} onChange={(e) =>
                                        setStock(e.target.value)} />
                            </div>
                            <center>
                                <Button className="stu_btn"
                                    variant="success"
                                    type="submit"
                                    onClick={(event) => submitform(event)}
                                >
                                    Update Item
                                </Button>
                            </center>
                        </form>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default EditItem