import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import component
import history from '../utils/history';
import RootContainer from './rootContainer';
import Room from './room';
import FormRoom from './room/formRoom';
import Robot from './robot';
import FormRobot from './robot/formRobot';
import Algorithm from './algorithm';
import FormAlgorithm from './algorithm/formAlgorithm';

const AppRouter = () => {
  return (
    <Router history={history}>
      <RootContainer>
        <Switch>
          <Route exact path="/" component={Algorithm} />
          <Route exact path="/rooms" component={Room} />
          <Route exact path="/form-room" component={FormRoom} />
          <Route exact path="/algorithms" component={Algorithm} />
          <Route exact path="/form-algorithm" component={FormAlgorithm} />
          <Route exact path="/robots" component={Robot} />
          <Route exact path="/form-robot" component={FormRobot} />
        </Switch>
      </RootContainer>
    </Router>
  );
};
AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool
};
const mapStateToProps = () => {
  return {
    // isLoggedIn: state.User.token !== null ? true : false
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
