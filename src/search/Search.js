import React, { Component } from 'react';
import './Search.css';

export default class Search extends Component {

    pokemonTypeList = [];

    handleChange = (event) => {
        const filterData = event.target.value;                           
        this.props.onNameChange(filterData, 'name');
    }

    componentDidUpdate() {        
        if(this.props.reset === true) 
        {            
            document.getElementsByClassName("inputText")[0].value = '';
        }
    }

    render() {
        return (                        
            <input className='inputText' type='text' placeholder='Filter by Pokemon name' onChange={this.handleChange}/>
        )
    }
}