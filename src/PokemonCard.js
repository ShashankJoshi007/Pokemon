import React from 'react'

import { Card } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';

export const CardComponent = (props) => {

    let navigate = useNavigate();

    let filteredData = props.details.filter((ele) => {
        if(props.searchText === ''){
            return ele
        }else{
            return ele.name.toLowerCase().includes(props.searchText) || ele.abilities.some((value) => value.includes(props.searchText))
        }
    })
    
    if(props.sortType){
        switch(props.sortType){
            case 'name': 
                filteredData = filteredData.sort((a, b)  => {
                if(a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
                })
                break;
            case 'height': 
                filteredData = filteredData.sort((a, b) => a.height - b.height)
                break;
            case 'weight':
                filteredData = filteredData.sort((a, b) => a.weight - b.weight)
                break;
            }
    }

    const handleClick = (item) => {

        sessionStorage.setItem('redirectURL', item.url)

        return navigate('/pokeDetails')

    }

    
    return filteredData.map((item) => <Card style={{ width: '18rem' }}> 
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <hr/>
                <Card.Text style={{"text-align": "left"}}>
                    <div>
                        <strong>Height:</strong> {item.height}
                    </div>
                    <div>
                        <strong>Weight:</strong> {item.weight}
                    </div>
                    <div>
                        <strong>Abilities:</strong> <ul>{item.abilities.map((ele, i) => <li key={i}>{ele}</li>)}</ul>
                    </div>
                </Card.Text>
                <Card.Link onClick={() => handleClick(item)}>More Details...</Card.Link>
        </Card.Body>
    </Card>)
}