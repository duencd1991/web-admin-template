import React, { Component } from 'react';
import Layout from '../layout/layout';
import history from '../../utils/history';
import Checkbox from '../../components/common/checkBox/checkBox';

const LIST_ROOM = [
  {
    id: 1,
    name: 'Room luxury',
    code: 'ROOM1',
    type: 'luxury',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Room normal',
    code: 'ROOM2',
    type: 'normal',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
];
const LIST_ALGORITHM = [
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  },
  {
    id: 1,
    name: 'Algorithm 01',
    code: 'AL01',
    description: 'description abc',
    status: true,
    date: '09/10/2019',
  },
  {
    id: 2,
    name: 'Algorithm 02',
    code: 'AL2',
    description: 'description xyz',
    status: false,
    date: '09/10/2019',
  }
]
class FormRobot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      room: '',
      algorithms: [],
      description: '',
      listAlgorithm: [],
      selectedRoom: null,
      showDropdownAlgorithm: false
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.showDropdownAlgorithm) {
      this.showDropdownAlgorithm(false);
    }
  }
  showDropdownAlgorithm = (isShow) => {
    this.setState({
      showDropdownAlgorithm: isShow
    })
  }
  onSelectAlgorithm = (index, item) => {
    let state = this.state;
    state.listAlgorithm[index].check = !state.listAlgorithm[index].check;
    if (state.listAlgorithm[index].check) {
      state.algorithms.push(item.code);
    } else {
      state.algorithms = state.algorithms.filter(algorithm => algorithm !== item.code);
    }
    this.setState(state);
  }

  onSelectRoom = (item) => {
    this.setState({
      room: item.code,
      selectedRoom: item
    })
  } 

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidMount() {
    const url = new URL(window.location);
    const robotId = url.searchParams.get("robotId");
    if (robotId) {
      //Update
      //TODO: load value to form
      this.setState({
        listAlgorithm: LIST_ALGORITHM
      })
    } else {
      // New
      this.setState({
        listAlgorithm: LIST_ALGORITHM
      })
    }
    document.addEventListener('mousedown', this.handleClickOutside);
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
      algorithms,
      description,
      listAlgorithm,
      selectedRoom,
      showDropdownAlgorithm
    } = this.state;

    return(
      <Layout title="">
        <form className='form-content' onSubmit={this.handleSubmit}>
          <h3 className='form-title'>Add Robot</h3>
          <div className='form-group'>
            <label className='field-title'>Name</label>
            <input type='text' className='form-control' value={name} name='name' onChange={this.handleChange} required/>
          </div>
          <div className='form-group'>
            <label className='field-title'>Room</label>
            <div className="btn-group dropdown-custom">
              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {selectedRoom ? selectedRoom.name : "Select room"}
              </button>
              <div className="dropdown-menu">
                {
                  LIST_ROOM.map((item, index) => {
                    return <span key={index} className="dropdown-item" onClick={() => this.onSelectRoom(item)}>{item.name}</span>
                  })
                }
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className='field-title'>Algorithms</label>
            <div className="btn-group dropdown-custom" >
              <button type="button" className="btn dropdown-toggle dropdown-select"
                aria-haspopup="true" aria-expanded="false" onClick={() => this.showDropdownAlgorithm(true)}>
                {algorithms.length > 0 ? algorithms.toString() : "Select algorithms"}
              </button>
              <div ref={this.setWrapperRef} id="dropdown-algorithms" className={showDropdownAlgorithm ? "dropdown-menu show" : "dropdown-menu"} >
                {
                  listAlgorithm.map((item, index) => {
                    return <Checkbox key={index} title={item.name} checked={item.check} value={index} onChange={() => this.onSelectAlgorithm(index, item)} />
                  })
                }
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className='field-title'>Description</label>
            <textarea row='4' className='form-control' value={description} name='description' onChange={this.handleChange} required/>
          </div>

          <div className='form-group btn-form-group'>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="cancel" className="btn btn-secondary" onClick={() => history.push({ pathname: '/robots'})}>Cancel</button>
          </div>
          
        </form>
      </Layout>
    );
  }

}

export default FormRobot;