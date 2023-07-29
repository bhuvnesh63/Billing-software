import React from 'react'
import Header from '../../Header/Header'
import './dashboard.css'
import { Col, Container, Row } from 'react-bootstrap'



const Dashboard = () => {
  return (
   <>
  <Header />
   
   <Container>
    <Row>
      <Col sm={4}>tt</Col>
      <Col sm={4}>tttr</Col>
      <Col sm={4}>rr</Col>
    </Row>
   </Container>
   
   
   </>
  )
}

export default Dashboard