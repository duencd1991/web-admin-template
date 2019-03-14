import React, { Component } from 'react';
import { ROOM_TYPE } from '../../utils/constant';
import Layout from '../layout/layout';
import history from '../../utils/history';

class FormRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      code: '',
      description: '',
      type: ''
    }
  }

  componentDidMount() {
    const url = new URL(window.location);
    const roomId = url.searchParams.get("roomId");
    if (roomId) {
      alert(`Get detail by : ${roomId}`);
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
      description,
      type
    } = this.state;
    return(
      <Layout title="">
        <form className='form-content' onSubmit={this.handleSubmit}>
          <h3 className='form-title'>Add Room</h3>
          <div className='form-group'>
            <label className='field-title'>Name</label>
            <input type='text' className='form-control' value={name} name='name' onChange={this.handleChange} required/>
          </div>
          <div className='form-group'>
            <label className='field-title'>Code</label>
            <input type='text' className='form-control' value={code} name='code' onChange={this.handleChange} required/>
          </div>
          <div className='form-group'>
            <label className='field-title'>Type</label>
            <select id="inputType" className="form-control" value={type} name='type' onChange={this.handleChange} required>
              {
                ROOM_TYPE.map((type, index) => {
                  return <option key={ index }>{ type }</option>
                })
              }
            </select>
          </div>
          <div className='form-group'>
            <label className='field-title'>Description</label>
            <textarea row='4' className='form-control' value={description} name='description' onChange={this.handleChange} required/>
          </div>

          <div className='form-group btn-form-group'>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="cancel" className="btn btn-secondary" onClick={() => history.push({ pathname: '/rooms'})}>Cancel</button>
          </div>
          
        </form>
      </Layout>
    );
  }

}

export default FormRoom;