
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'


import { CardComponent } from './PokemonCard'
import { FormControl, FormSelect, Pagination, Row } from 'react-bootstrap';

function PokemonList() {
  const [eachPokeDetails, setEachPokeDetails] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [sortType, setSortType] = useState('') 

  function getEachData(response) {

    if (response.results.length > 0) {
      let newList = []
      let promises = []
      response.results.forEach((ele) => {
        promises.push(axios.get(ele.url))
      })

      Promise.all(promises).then((values) => {
        values.forEach(({ data, request }) => {
          let obj = {}
          obj['name'] = data.name
          obj['height'] = data.height
          obj['weight'] = data.weight
          obj['abilities'] = data.abilities.length > 0 ? data.abilities.map((e) => e.ability.name) : []
          obj['image'] = data.sprites.other['official-artwork'].front_default
          obj['url'] = request.responseURL
          newList.push(obj)
        })

        setEachPokeDetails(newList)

      })
    }

  }

  const getNextData = async () => {
    setLoading(true)
    let response = null 
    response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset + 10}`)
      .then((res) => {
        setLoading(false)
        return res.data
      })

    getEachData(response)
    setOffset(offset + 10)
  }

  const getPreviousData = async () => {
    if(offset !== 0) {
    setLoading(true)
    let response = null 
    response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset - 10}`)
      .then((res) => {
        setLoading(false)
        return res.data
      })

    getEachData(response)
    setOffset(offset - 10)
    }
  }

  const onSelect = async (e) => {
    setLoading(true)
    let response = null 
    response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${e.target.value}&offset=${offset}`)
      .then((res) => {
        setLoading(false)
        return res.data
      })

    getEachData(response)
  }

  const onSearch = (e) => {
    let searchText = e.target.value.toLowerCase()
    setSearchText(searchText)
    
  }

  const sortPokemon = (e) => {
    setSortType(e.target.value)
    
  }

  useEffect(() => {
    async function getData(){
      let response = null
      response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then((res) => {
        return res.data
      })
      getEachData(response)
    }
    getData()}, [])



  return (
    
    <div className="App">
      <h4>Pokémon</h4>
      <Row className='mt-4'>
        <FormControl className="ml-2" style={{"width": "70%"}} type="text" placeholder='Search the pokemon by name or abilities' onKeyUp={(e) => onSearch(e)}/>
      </Row>      
      <Row style={{"float": "right"}}>
        <Pagination className='mt-2'>
            <FormSelect onChange={(e) => onSelect(e)} defaultValue={10}> 
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </FormSelect>
          <Pagination.Prev onClick={() => getPreviousData()}>Prev</Pagination.Prev>
          <Pagination.Next onClick={() => getNextData()}>Next</Pagination.Next>
        </Pagination>
      </Row>
      <Row>
          <FormSelect className='mt-2 ml-2' style={{"width": "fit-content"}} onChange={(e) => sortPokemon(e)} defaultValue=""> 
                  <option value=''>Sort By</option>
                  <option value='name'>Name</option>
                  <option value='height'>Height</option>
                  <option value='weight'>Weight</option>
          </FormSelect>
      </Row>
      <div style={{"height": "20px"}}></div>
      {loading ? <h3>Loading...</h3> : 
        <Row>
            <CardComponent details={eachPokeDetails} loading={loading} searchText={searchText} sortType={sortType}/>
        </Row>
      }
      <Row style={{"float": "right"}}>
      <Pagination>
          <FormSelect onChange={(e) => onSelect(e)} defaultValue={10}> 
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
          </FormSelect>
        <Pagination.Prev onClick={() => getPreviousData()}>Prev</Pagination.Prev>
        <Pagination.Next onClick={() => getNextData()}>Next</Pagination.Next>
      </Pagination>
      </Row>
    </div>
  );
}

export default PokemonList;
