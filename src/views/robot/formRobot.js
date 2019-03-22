import React, { Component } from 'react';
import Layout from '../layout/layout';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { compose } from 'redux';
import history from '../../utils/history';
import Checkbox from '../../components/common/checkBox/checkBox';
import { withTranslation } from 'react-i18next';
import actions from '../../store/robot/actions';
import roomActions from '../../store/room/actions';
import algorithmActions from '../../store/algorithm/actions';
import notifyActions from '../../store/notification/actions';

class FormRobot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      formValid: true,
      showDropdownAlgorithm: false,
      listAlgorithm: [],

      robotRoomId: '',
      robotAlgorithmId: [],
      describtion: '',
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
      state.robotAlgorithmId.push(item.id);
    } else {
      state.robotAlgorithmId = state.robotAlgorithmId.filter(algorithm => algorithm !== item.id);
    }
    this.setState(state);
  }

  onSelectRoom = (item) => {
    this.setState({
      robotRoomId: item.id
    })
  } 

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidMount() {
    const url = new URL(window.location);
    const roomId = url.searchParams.get("roomId");
    if (roomId) {
      this.setState({
        isUpdate: true
      })
      this.props.get(roomId);
    } else {
      this.setState({
        isUpdate: false
      })
    }
    this.props.getRooms();
    this.props.getAlgorithms();
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== this.props.detail) {
      const detail = nextProps.detail;
      if (detail) {
        let robotAlgothmId = detail.listAlgorithm.map(item => {
          return item.id
        })
        this.setState({
          describtion: detail.desc,
          robotRoomId: detail.roomId,
          robotAlgorithmId: robotAlgothmId
        })
      }
    }
    if (nextProps.listPropsAlgorithms !== this.props.listPropsAlgorithms
      && nextProps.listPropsAlgorithms.length > 0) {
      this.setState({
        listAlgorithm: nextProps.listPropsAlgorithms
      })
    }
    if (nextProps.error !== '' && nextProps.error !== this.props.error) {
      toast(nextProps.error);
      this.props.clearNotify();
    }
    if (nextProps.message !== '' && nextProps.message !== this.props.message) {
      toast(nextProps.message);
      this.props.clearNotify();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formValidate = () => {
    const state = this.state;
    let valid = state.describtion !== '' && state.robotRoomId !== '' && state.robotAlgorithmId.length > 0;
    this.setState({
      formValid: valid
    })
    return valid;
  }

  handleSubmit = (e) => {
    const state = this.state;
    if (this.formValidate()) {
      if (state.isUpdate) {
        const data = {
          robotRoomId: state.robotRoomId,
          describtion: state.describtion,
          robotAlgorithmId: state.robotAlgorithmId
        }
        this.props.update(data);
      } else {
        const data = {
          robotRoomId: state.robotRoomId,
          describtion: state.describtion,
          robotAlgorithmId: state.robotAlgorithmId
        }
        this.props.create(data);
      }
    }
    
    e.preventDefault();
  }

  render() {
    const {
      isUpdate,
      showDropdownAlgorithm,
      listAlgorithm,
      formValid,

      robotRoomId,
      robotAlgorithmId,
      describtion,
    } = this.state;
    const { t, listPropsRoom } = this.props;
    let selectedRoom = null;
    if (robotRoomId) {
      for (let i = 0; i < listPropsRoom.length; i ++) {
        if (listPropsRoom[i].id === robotRoomId) {
          selectedRoom = listPropsRoom[i];
        }
      }
    }

    let convertedListAlgorithm = listAlgorithm;
    let selectedAlgotithm = [];
    if(robotAlgorithmId.length > 0) {
      for (let i = 0; i < robotAlgorithmId.length; i ++) {
        for (let j = 0; j < convertedListAlgorithm.length; j ++) {
          if (robotAlgorithmId[i] === convertedListAlgorithm[j].id) {
            convertedListAlgorithm[j].check = true;
            selectedAlgotithm.push(convertedListAlgorithm[j].name);
          }
        }
      }
    }

    return(
      <Layout title="">
        <form className='form-content' onSubmit={this.handleSubmit}>
          <h3 className='form-title'>{t('Add-Robot')}</h3>
          <div className='form-group'>
            <label className='field-title'>{t('Rooms')}</label>
            <div className="btn-group dropdown-custom">
              <button type="button" disabled={isUpdate} className="btn dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {selectedRoom ? selectedRoom.name : t('Select-Room')}
              </button>
              <div className="dropdown-menu">
                {
                  listPropsRoom.map((item, index) => {
                    return <span key={index} className="dropdown-item" onClick={() => this.onSelectRoom(item)}>{item.name}</span>
                  })
                }
              </div>
            </div>
            {
              !formValid && robotRoomId === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Algorithms')}</label>
            <div className="btn-group dropdown-custom" >
              <button type="button" className="btn dropdown-toggle dropdown-select"
                aria-haspopup="true" aria-expanded="false" onClick={() => this.showDropdownAlgorithm(true)}>
                {selectedAlgotithm.length > 0 ? selectedAlgotithm.toString() : t('Select-Algorithm')}
              </button>
              <div ref={this.setWrapperRef} id="dropdown-algorithms"
                className={showDropdownAlgorithm ? "dropdown-menu show" : "dropdown-menu"} >
                {
                  convertedListAlgorithm.map((item, index) => {
                    return <Checkbox key={index} title={item.name} checked={item.check}
                    value={index} onChange={() => this.onSelectAlgorithm(index, item)} />
                  })
                }
              </div>
            </div>
            {
              !formValid && selectedAlgotithm.length === 0 && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Des')}</label>
            <textarea row='4' className='form-control' value={describtion} name='describtion'
              onChange={this.handleChange}/>
            {
              !formValid && robotRoomId === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>

          <div className='form-group btn-form-group'>
            <button type="submit" className="btn btn-primary">{t('Submit')}</button>
            <button type="cancel" className="btn btn-secondary"
              onClick={() => history.push({ pathname: '/robots'})}>{t('Cancel')}</button>
          </div>
          
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.Robots.detail,
    error: state.Notifys.error,
    message: state.Notifys.message,
    listPropsRoom: state.Rooms.list,
    listPropsAlgorithms: state.Algorithms.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRooms: () => {
      dispatch(roomActions.list("", 0, 100000));
    },
    getAlgorithms: () => {
      dispatch(algorithmActions.list("", 0, 100000));
    },
    get: (id) => {
      dispatch(actions.get(id));
    },
    create: (body) => {
      dispatch(actions.create(body))
    },
    update: (body) => {
      dispatch(actions.update(body))
    },
    clearNotify: () => {
      dispatch(notifyActions.clearNotify());
    }
  }
};


export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(FormRobot);