import React, { Component } from 'react';
import './Type.css';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeArr : []
        };
    }

    handleChange = (event) => {        
        const filterData = event.target.value;                           
        this.props.onNameChange(filterData, 'type');
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/type")
        .then(res => res.json())
        .then(res => 
            {
                let typeArr = []
                res.results.map((type, i) => typeArr.push({value : type.name, label: type.name}));
                this.setState({
                    typeArr : typeArr
               })
        })        
    }

    componentDidUpdate() {        
        if(this.props.reset === true) 
        {            
            document.getElementsByClassName("select")[0].value = 'placeholder';
        }
    }

    render() {
        const { typeArr } = this.state;
        return(
            <select defaultValue={'placeholder'} className='select' onChange={this.handleChange}>
                <option value="placeholder" disabled>Filter by Pokemon type</option>
                <option className='text' value="">All</option>
                { typeArr.map((type, i) => <option className='text' key={i} value={type.value}>{type.label}</option>) }
            </select>
        )
    }

}