import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './layout.scss';
import headerActions from '../../store/header/actions';
import Header from '../../components/header/header';
import LeftSideBar from '../../components/leftSideBar/leftSideBar';
import Loading from '../../components/loading/loading';

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
    {
      props.loading && <Loading />
    }
  </React.Fragment>
);

Layout.propTypes = {
  title: PropTypes.string
};

const mapStateToProps = state => {
  return {
    statusMenu: state.Header.showMenu,
    loading: state.Notifys.loading
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
