import React, { Component } from 'react';
import Layout from '../layout/layout';
import history from '../../utils/history';

class FormAlgorithm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      code: '',
      description: ''
    }
  }

  componentDidMount() {
    const url = new URL(window.location);
    const algorithmId = url.searchParams.get("algorithmId");
    if(algorithmId) {
      alert(`Get detail by : ${algorithmId}`);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {

    console.log(this.state);
    
    e.preventDefault();
  }

  render() {
    const {
      name,
      code,
      description
    } = this.state;
    return(
      <Layout title="">
        <form className='form-content' onSubmit={this.handleSubmit}>
          <h3 className='form-title'>Add Algorithm</h3>
          <div className='form-group'>
            <label className='field-title'>Name</label>
            <input type='text' className='form-control' value={name} name='name' onChange={this.handleChange} required/>
          </div>
          <div className='form-group'>
            <label className='field-title'>Code</label>
            <input type='text' className='form-control' value={code} name='code' onChange={this.handleChange} required/>
          </div>
          <div className='form-group'>
            <label className='field-title'>Description</label>
            <textarea row='4' className='form-control' value={description} name='description' onChange={this.handleChange} required/>
          </div>

          <div className='form-group btn-form-group'>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="cancel" className="btn btn-secondary" onClick={() => history.push({ pathname: '/algorithms'})}>Cancel</button>
          </div>
          
        </form>
      </Layout>
    );
  }

}

export default FormAlgorithm;