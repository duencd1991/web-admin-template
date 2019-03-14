import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './layout.scss';
import headerActions from '../../store/header/actions';
import Header from '../../components/header/header';
import LeftSideBar from '../../components/leftSideBar/leftSideBar';

const Layout = props => (
  <React.Fragment>
    <Header title={props.title} />
    <LeftSideBar/>
    <div className='content-body'>
      {props.children}
    </div>
    {
      props.statusMenu && <div className='bodyClick' onClick={props.hideMenu}></div>
    }
  </React.Fragment>
);

Layout.propTypes = {
  title: PropTypes.string
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
