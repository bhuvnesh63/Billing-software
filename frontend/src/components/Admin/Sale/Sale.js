// import React, { useEffect, useState } from 'react';
// import Layout from '../../Header/Layout';
// import { Button, Col, Container, Row, Table } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import { AiFillDashboard } from 'react-icons/ai';
// import { IoIosCreate } from 'react-icons/io';
// import './sale.css';
// import axios from 'axios';

// const ItemsUrl = 'http://localhost:4000/api/v1/items';
// const SaleOrderUrl = 'http://localhost:4000/api/v1/saleorder/new';

// const Sale = () => {
//   const [getitems, setGetItems] = useState(null);
//   const [customerName, setCustomerName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [items, setItems] = useState([
//     {
//       itemName: '',
//       pricewithoutgst: '',
//       cgstPerItem: '',
//       sgstPerItem: '',
//       pricePerItem: '',
//       quantity: 1,
//       totalPrice: '',
//     },
//   ]);
//   const [selectedPrice, setSelectedPrice] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(ItemsUrl).then((response) => {
//       setGetItems(response.data);
//       console.log(response, 'list');
//     });
//   }, []);

//   const increment = (index) => {
//     setItems((prevItems) =>
//       prevItems.map((item, i) =>
//         i === index ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decrement = (index) => {
//     setItems((prevItems) =>
//       prevItems.map((item, i) =>
//         i === index ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
//       )
//     );
//   };

//   const updatePriceWithQuantity = () => {
//     setItems((prevItems) =>
//       prevItems.map((item) => ({
//         ...item,
//         totalPrice: (item.pricePerItem * item.quantity).toFixed(2),
//         cgstPerItem: (item.initialCgstPerItem * item.quantity).toFixed(2),
//         sgstPerItem: (item.initialSgstPerItem * item.quantity).toFixed(2),
//         pricewithoutgst: (item.initialamountwithoutgst * item.quantity).toFixed(2),
//       }))
//     );
//   };

//   useEffect(() => {
//     updatePriceWithQuantity();
//   }, [items]);

//   const getItemPrice = (selectedItemName, index) => {
//     const selectedItemObj = getitems?.items?.find(
//       (items) => items.itemName === selectedItemName
//     );

//     if (selectedItemObj) {
//       setItems((prevItems) =>
//         prevItems.map((item, i) =>
//           i === index
//             ? {
//                 ...item,
//                 pricePerItem: selectedItemObj.sellingPrice,
//                 initialCgstPerItem: selectedItemObj.cgstPerItem,
//                 cgstPerItem: selectedItemObj.cgstPerItem,
//                 initialSgstPerItem: selectedItemObj.sgstPerItem,
//                 sgstPerItem: selectedItemObj.sgstPerItem,
//                 pricewithoutgst: selectedItemObj.pricewithoutgst,
//                 initialamountwithoutgst: selectedItemObj.pricewithoutgst,
//               }
//             : item
//         )
//       );
//     }
//   };

//   const addMoreItems = () => {
//     setItems((prevItems) => [
//       ...prevItems,
//       {
//         itemName: '',
//         pricewithoutgst: '',
//         cgstPerItem: '',
//         sgstPerItem: '',
//         pricePerItem: '',
//         quantity: 1,
//         totalPrice: '',
//       },
//     ]);
//   };

//   const submitform = async (event) => {
//     event.preventDefault();
//     try {
//       const saleOrderData = {
//         customerName: customerName,
//         mobileNumber: mobileNumber,
//         Items: items.map((item) => ({
//           itemName: item.itemName,
//           pricePerItem: item.pricePerItem,
//           quantity: item.quantity.toString(),
//           totalPrice: parseFloat(item.totalPrice),
//           amountWithoutGST: parseFloat(item.pricewithoutgst),
//           cgstapplied: parseFloat(item.cgstPerItem),
//           sgstapplied: parseFloat(item.sgstPerItem),
//         })),
//       };

//       await axios.post(SaleOrderUrl, saleOrderData);
//       navigate('/billlist');
//     } catch (error) {
//       console.log('Error saving sale order data:', error.response);
//     }
//   };

//   return (
//     <>
//       <Layout />
//       <Container className="mt-4">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>
//                 <h5>
//                   <AiFillDashboard /> &nbsp;Dashboard / Add Sale
//                 </h5>
//               </th>
//             </tr>
//           </thead>
//         </Table>

//         <Row>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>
//                   <div>
//                     <Button className="table-btn" variant="light">
//                       <IoIosCreate />
//                       &nbsp;
//                       <Link to="/salelist">Go Back</Link>
//                     </Button>
//                   </div>
//                 </th>
//               </tr>
//             </thead>
//           </Table>
//         </Row>
//       </Container>

//       <div className="form-div">
//         <Container>
//           <Row>
//             <form className="row g-4 p-3 registration-form">
//               <div className="col-md-4 position-relative">
//                 <label className="label">Customer Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-4 mb-5 position-relative">
//                 <label className="label">Mobile No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={mobileNumber}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                   required
//                 />
//               </div>

//               <hr></hr>

//               <h5>Product Details</h5>

//               {items.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <Col sm={2}>
//                     <label className="label">Item Name</label>
//                     <Form.Select
//                       onChange={(e) => {
//                         setItems((prevItems) =>
//                           prevItems.map((it, i) =>
//                             i === index ? { ...it, itemName: e.target.value } : it
//                           )
//                         );
//                         getItemPrice(e.target.value, index);
//                       }}
//                     >
//                       <option>Choose</option>
//                       {getitems?.items?.map((items) => (
//                         <option key={items._id} value={items.itemName}>
//                           {items.itemName}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Col>

//                   <div className="col-md-2 position-relative">
//                     <label className="label">Amount without GST</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.pricewithoutgst}
//                       readOnly
//                     />
//                   </div>

//                   <div className="col-md-2 position-relative">
//                     <label className="label">CGST Applied</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.cgstPerItem}
//                       readOnly
//                     />
//                   </div>

//                   <div className="col-md-2 position-relative">
//                     <label className="label">SGST Applied</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.sgstPerItem}
//                       readOnly
//                     />
//                   </div>

//                   <div className="col-md-2 position-relative">
//                     <label className="label">Price per item</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.pricePerItem}
//                       readOnly
//                     />
//                   </div>

//                   <div className="col-md-2 position-relative">
//                     <label className="label">Quantity</label>
//                     <div className="cart-buttons">
//                       <div className="quantity-buttons">
//                         <span className="increment-buttons" onClick={() => decrement(index)}>
//                           -
//                         </span>
//                         <span className="increment-buttons">{item.quantity}</span>
//                         <span className="increment-buttons" onClick={() => increment(index)}>
//                           +
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <Col sm={2}>
//                     <label className="label">Total Price</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.totalPrice}
//                       onChange={(e) => {
//                         setItems((prevItems) =>
//                           prevItems.map((it, i) =>
//                             i === index ? { ...it, totalPrice: e.target.value } : it
//                           )
//                         );
//                       }}
//                       required
//                     />
//                   </Col>
//                 </React.Fragment>
//               ))}

//               <center>
//                 <Button className="float-end" variant="success" type="button" onClick={addMoreItems}>
//                   Add more
//                 </Button>
//               </center>

//               <center>
//                 <Button
//                   className="stu_btn"
//                   variant="success"
//                   type="submit"
//                   onClick={submitform}
//                 >
//                   Submit
//                 </Button>
//               </center>
//             </form>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Sale;




import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './sale.css';
import axios from 'axios';

const ItemsUrl = 'http://localhost:4000/api/v1/items';
const SaleOrderUrl = 'http://localhost:4000/api/v1/saleorder/new';

const Sale = () => {
  const [getitems, setGetItems] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [items, setItems] = useState([
    {
      itemName: '',
      pricewithoutgst: '',
      cgstPerItem: '',
      sgstPerItem: '',
      pricePerItem: '',
      quantity: 1,
      totalPrice: '',
    },
  ]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data);
      console.log(response, 'list');
    });
  }, []);

  const increment = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const updatePriceWithQuantity = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        totalPrice: (item.pricePerItem * item.quantity).toFixed(2),
        cgstPerItem: (item.initialCgstPerItem * item.quantity).toFixed(2),
        sgstPerItem: (item.initialSgstPerItem * item.quantity).toFixed(2),
        pricewithoutgst: (item.initialamountwithoutgst * item.quantity).toFixed(2),
      }))
    );
  };

  useEffect(() => {
    updatePriceWithQuantity();
  }, [items]);

  const getItemPrice = (selectedItemName, index) => {
    const selectedItemObj = getitems?.items?.find(
      (items) => items.itemName === selectedItemName
    );

    if (selectedItemObj) {
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? {
                ...item,
                pricePerItem: selectedItemObj.sellingPrice,
                initialCgstPerItem: selectedItemObj.cgstPerItem,
                cgstPerItem: selectedItemObj.cgstPerItem,
                initialSgstPerItem: selectedItemObj.sgstPerItem,
                sgstPerItem: selectedItemObj.sgstPerItem,
                pricewithoutgst: selectedItemObj.pricewithoutgst,
                initialamountwithoutgst: selectedItemObj.pricewithoutgst,
              }
            : item
        )
      );
    }
  };

  const addMoreItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        itemName: '',
        pricewithoutgst: '',
        cgstPerItem: '',
        sgstPerItem: '',
        pricePerItem: '',
        quantity: 1,
        totalPrice: '',
      },
    ]);
  };

  const submitform = async (event) => {
    event.preventDefault();
    try {
      const saleOrderData = {
        customerName: customerName,
        mobileNumber: mobileNumber,
        Items: items.map((item) => ({
          itemName: item.itemName,
          pricePerItem: item.pricePerItem,
          quantity: item.quantity.toString(),
          totalPrice: parseFloat(item.totalPrice),
          amountWithoutGST: parseFloat(item.pricewithoutgst),
          cgstapplied: parseFloat(item.cgstPerItem),
          sgstapplied: parseFloat(item.sgstPerItem),
        })),
      };

      await axios.post(SaleOrderUrl, saleOrderData);
      navigate('/billlist');
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
                      <IoIosCreate />
                      &nbsp;
                      <Link to="/salelist">Go Back</Link>
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

              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <Col sm={2}>
                    <label className="label">Item Name</label>
                    <Form.Select
                      onChange={(e) => {
                        setItems((prevItems) =>
                          prevItems.map((it, i) =>
                            i === index ? { ...it, itemName: e.target.value } : it
                          )
                        );
                        getItemPrice(e.target.value, index);
                      }}
                    >
                      <option>Choose</option>
                      {getitems?.items?.map((items) => (
                        <option key={items._id} value={items.itemName}>
                          {items.itemName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <div className="col-md-2 position-relative">
                    <label className="label">Amount without GST</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.pricewithoutgst}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">CGST Applied</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.cgstPerItem}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">SGST Applied</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.sgstPerItem}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Price per item</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.pricePerItem}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Quantity</label>
                    <div className="cart-buttons">
                      <div className="quantity-buttons">
                        <span className="increment-buttons" onClick={() => decrement(index)}>
                          -
                        </span>
                        <span className="increment-buttons">{item.quantity}</span>
                        <span className="increment-buttons" onClick={() => increment(index)}>
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  <Col sm={2}>
                    <label className="label">Total Price</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.totalPrice}
                      onChange={(e) => {
                        setItems((prevItems) =>
                          prevItems.map((it, i) =>
                            i === index ? { ...it, totalPrice: e.target.value } : it
                          )
                        );
                      }}
                      required
                    />
                  </Col>
                </React.Fragment>
              ))}

              <center>
                <Button className="float-end" variant="success" type="button" onClick={addMoreItems}>
                  Add more
                </Button>
              </center>

              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={submitform}
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
