import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
// import style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../style/index.scss';

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

const RootContainer = props => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        {props.children}
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default RootContainer;
