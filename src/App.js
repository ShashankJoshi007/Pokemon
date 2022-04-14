
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import PokemonList from './PokemonList';
import PokeDetails from './PokeDetails'

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<PokemonList/>} />
      <Route path="pokeDetails" element={<PokeDetails />} />
    </Routes>
    
  )
}

export default App