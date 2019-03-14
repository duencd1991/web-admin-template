import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import './leftSideBar.scss'
import Logo from '../../assets/img/vi_mbs_logo.png';

const leftSideBar = props => {

  const { t } = props;

  const leftMenu = [
    {
      name: t('Algorithms'),
      path: "/algorithms"
    },
    {
      name: t('Rooms'),
      path: "/rooms"
    },
    {
      name: t('Robots'),
      path: "/robots"
    }
  ];

  return (
    <div className={ props.statusMenu ? 'left-side-bar show' : 'left-side-bar'}>
      <div className='side-logo'>
        <img src={Logo} alt='logo'/>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {
            leftMenu.map((menu, key) => {
              return (
                <li key={key}>
                  <NavLink
                    to={menu.path}
                    className="nav-link"
                    activeClassName="active" >
                    <p>{menu.name}</p>
                  </NavLink>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}
leftSideBar.propsTypes = {
  leftMenu: PropTypes.array,
  t: PropTypes.func
}

const mapStateToProps = state => {
  return {
    statusMenu: state.Header.showMenu
  };
};

const mapDispatchToProps = {}

export default compose(
  withTranslation(),
  connect(mapStateToProps,mapDispatchToProps)
)(leftSideBar);