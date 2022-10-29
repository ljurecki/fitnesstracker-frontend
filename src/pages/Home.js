import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import img1 from '../images/pexels-alesia-kozik-7289241.jpg'
import img2 from '../images/pexels-andrea-piacquadio-3769698.jpg'
import img3 from '../images/pexels-guy-kawasaki-1654498.jpg'
import img4 from '../images/pexels-kuiyibo-campos-13993722.jpg'
import img5 from '../images/pexels-mart-production-7880002.jpg'
import img6 from '../images/pexels-timothy-yiadom-14075416.jpg'

const Home = () => {
  
  return (
    <>
    <div >
      <h1 id="hpTitle">Share Your Fitness Activities and Routines</h1>
    </div>
  
  <Container>
      <Row>
        <Col xl={true}>
        <img src={img1}
         style={{ width: "95%"}} 
         />
          </Col>
        <Col xl={true}>
        <img src={img2}
         style={{ width: "95%"}} 
         />
        </Col>
        <Col xl={true}>
        <img src={img3}
         style={{ width: "95%"}} 
         />
        </Col>
      </Row>
      <Row style={{paddingTop:"2rem"}}>
        <Col xl={true}>
        <img src={img4}
         style={{ width: "95%"}} 
         />
        </Col>
        <Col xl={true}>
        <img src={img5}
         style={{ width: "95%"}} 
         />
        </Col>
        <Col xl={true}>
        <img src={img6}
         style={{ width: "95%"}} 
         />
        </Col>
      </Row>
    </Container>
  
  </>
  )
};

export default Home;
