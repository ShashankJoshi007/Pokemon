import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Row, Col, Container, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const PokeDetails = () => {
    const [response, setResponse] = useState(null)

    let navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            let response = null
            response = await axios.get(sessionStorage.getItem("redirectURL"))
                .then((res) => {
                    return res.data
                })

                setResponse(response)
        }

        getData()
        sessionStorage.clear()
    }, [])

    console.log(response)
    if(response){
    return (
    <Container style={{"height": "800px", "backgroundColor": "aliceblue"}}>
        <h4>Pokémon Details</h4>
        <Row xs={2} md={4} lg={6}>
          <Col>Pokemon Name:</Col>
          <Col>{response.name}</Col>
        </Row>
        <Row xs={2} md={2} lg={2}>
          <Col>Height</Col>
          <Col>{response.height}</Col>
        </Row>
        <Row xs={2} md={2} lg={2}>
          <Col>Weight</Col>
          <Col>{response.weight}</Col>
        </Row>
        <Row xs={2} md={2} lg={2}>
          <Col>Species</Col>
          <Col>{response.species.name}</Col>
        </Row>
        <Row xs={2} md={2} lg={2}>
          <Col>Base Experience</Col>
          <Col>{response.base_experience}</Col>
        </Row>
        <Row xs={2} md={2} lg={2}>
          <Col></Col>
          <Col></Col>
        </Row>

        <Row>
            <Col>Image: </Col>
            <Col><img src={response.sprites.other['official-artwork'].front_default} width="500" height="600"/></Col>
        </Row>
        <Row style={{"float": "right", "width": "20%"}}><Button  variant="primary" onClick={() => navigate('/')}>Back to Pokemon List</Button></Row>
      </Container>
      )
    }else{
        return null
    }


}

export default PokeDetails