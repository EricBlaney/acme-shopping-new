import { connect } from "react-redux";
import React from 'react';

const Search = ({ history }) => {
    return (
      <input className='searchbar' onChange={ev => ev.target.value ? history.push(`/search/${ev.target.value}`) : history.push('/')} placeholder=' Search Games'/>
    )
  }

export default connect(null)(Search);