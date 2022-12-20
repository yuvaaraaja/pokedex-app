import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {

    render() {
        const name = this.props.pokemon.name;
        let link = 'https://www.pokemon.com/us/pokedex/' + name;
        if(link.includes('nidoran-m'))
        {
            link = link + 'ale'
        }
        if(link.includes('nidoran-f'))
        {
            link = link + 'emale'
        }
        const image = this.props.pokemon.image;
        const type = this.props.pokemon.type;        
        return (            
            <div className='card'>
                <a href={link} target="_blank" rel="noreferrer">
                    <span className="link"></span>
                </a>
                <center>
                    <img src={image} alt="nothing" className='img'></img>
                </center>
                <br></br>
                <center className='capitalize bold'>{name}</center>
                <center className='capitalize'>
                    <label className='bold'>Type : </label>
                    {type}
                </center>
            </div>
        )
    }
}