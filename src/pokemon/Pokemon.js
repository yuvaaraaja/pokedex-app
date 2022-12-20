import React, { Component } from 'react';
import Card from '../card/Card';
import Search from '../search/Search';
import Type from '../type/Type';
import './Pokemon.css';

export default class Pokemon extends Component {

  localPokemonArr = [];
  pokemonUrlList = [];
  nameFilter = '';  
  typeFilter = '';  

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,        
        pokemonDataList: [],        
        pokemonDataFilteredList: [],
        reset: false
      };      
    }

    componentDidMount() {
      this.callPrimaryPokemonAPI()
      .then(this.callPokemonApiForEachPokemon);      
    }

    componentDidUpdate() {
      if(this.state.reset === true)
      {        
        this.setState({
          reset : false
        })
      }   
    }

    callPrimaryPokemonAPI = () => {
      return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(
        (result) => {      
          this.pokemonUrlList = result.results;
          this.setState({
            isLoaded: true,
            pokemonUrlList: result.results
          });          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });              
        }
      )
    }

    callPokemonApiForEachPokemon = () => {      
      this.pokemonUrlList.map((pokemonUrl, i) => (
        fetch(pokemonUrl.url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            var types = [];            
            res.types.map(typeObj => types.push(typeObj.type.name));            
            let pokemonObj = { 
              name : res.name,
              image: res.sprites.other["official-artwork"]["front_default"],
              type: types.join(", ")
            }
            this.localPokemonArr.push(pokemonObj)                    
        }).then(
          () => {            
            this.setState ({
              pokemonDataList : this.localPokemonArr,
              pokemonDataFilteredList : this.localPokemonArr              
            })
          } 
        ) 
      ))                
    }

    handleSearch = (filterData, inputType) => {               
      let filteredList = this.state.pokemonDataList;       
      if(inputType === 'name')
      {
          this.nameFilter = filterData;
      }
      if(inputType === 'type')
      {
          this.typeFilter = filterData;             
      }
      filteredList = filteredList.filter(
        pokemonData => {              
            return pokemonData.name.toLowerCase().search(this.nameFilter.toLowerCase()) !== -1;
        }
      )
      filteredList = filteredList.filter(
        pokemonData => {              
            return pokemonData.type.toLowerCase().search(this.typeFilter.toLowerCase()) !== -1;
        }
      ) 
      this.setState ({
        pokemonDataFilteredList : filteredList
      })      
    }

    handleClear = () => {
      const {pokemonDataList} = this.state;
      this.setState ({
        pokemonDataFilteredList : pokemonDataList,        
        reset: true
      })
    }

    render() {
      const { error, isLoaded, pokemonDataFilteredList, reset } = this.state;
      let message = 'Displaying ' + pokemonDataFilteredList.length + ' pokemon' ;
      if(pokemonDataFilteredList.length === 0)
      {
          message = 'No Pokemon with the filtered criteria';
      }

      if (error) 
      {
        return <div className='error'>Error: {error.message}</div>;
      } 
      else if (!isLoaded) 
      {
        return <div className='loading'>Loading...</div>;
      } 
      else 
      {        
        return (        
        <div>
          <div className='input'>
            <Type reset={reset} onNameChange={this.handleSearch}/>
            <Search reset={reset} onNameChange={this.handleSearch}/>
            <button className='clear' onClick={this.handleClear}>Clear</button>                       
          </div>          
          <div className='message'>
              <center> {message} </center>
            </div>
          <div className='container'>            
            {(                    
                  pokemonDataFilteredList.map((a, i) => (
                    <Card pokemon={a} key = {i}/>                                
                    ))
            )}
          </div>
        </div>
        );
      }
    }
}