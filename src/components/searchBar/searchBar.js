import React from 'react';
import './searchBar.scss';
import PropTypes from 'prop-types';

const searchBar = props => {
  return (
    <div className='search-bar'>
      <input type='text' className="form-control" placeholder={props.placeHolder}
        onChange={props.onChange} onKeyDown={props.onKeyDown}/>
      <i className="fas fa-search" onClick={props.onRequestSearch}></i>
    </div>
  );
}
searchBar.propsTypes = {
  placeHolder: PropTypes.string,
  searchKey: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onRequestSearch: PropTypes.func
}
export default searchBar;