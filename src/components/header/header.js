import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.scss';
import headerActions from '../../store/header/actions';
import Language from '../../components/language/language';

const header = props => {

  return (
    <div className="header-wrapper">
      <Language />
      <div className='header-title'>{props.title}</div>
      <button className={props.statusMenu ? "navbar-toggler show-menu" : "navbar-toggler"} type="button" data-toggle="collapse"
        data-target="#leftsidebarToggle" aria-controls="leftsidebarToggle"
        aria-expanded="false" aria-label="Toggle navigation" onClick={props.statusMenu ? () => props.hideMenu() : () => props.showMenu()}>
        <span className="icon-bar bar1"></span>
        <span className="icon-bar bar2"></span>
        <span className="icon-bar bar3"></span>
      </button>
    </div>
  );
}
header.propsTypes = {
  title: PropTypes.string,
  t: PropTypes.func
}

const mapStateToProps = state => {
  return {
    statusMenu: state.Header.showMenu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showMenu: () => {
      dispatch(headerActions.showMenu());
    },
    hideMenu: () => {
      dispatch(headerActions.hideMenu());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(header);