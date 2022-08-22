import { connect } from "react-redux";
import React from 'react';
import './Search.css';

const Search = ({ history }) => {
    return (
      <input className='searchbar' onChange={ev => ev.target.value ? history.push(`/search/${ev.target.value}`) : history.push('/')} placeholder='Enter Game Here'/>
    )
  }

export default connect(null)(Search);