import React, { Component } from 'react';
import { ROOM_TYPE } from '../../utils/constant';
import Layout from '../layout/layout';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { compose } from 'redux';
import history from '../../utils/history';
import { withTranslation } from 'react-i18next';
import actions from '../../store/room/actions';
import notifyActions from '../../store/notification/actions';

class FormRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      formValid: true,
      name: '',
      room: '',
      describtion: '',
      type: ''
    }
  }

  componentDidMount() {
    const url = new URL(window.location);
    const roomId = url.searchParams.get("roomId");
    
    if (roomId) {
      this.setState({
        isUpdate: true
      })
      this.props.get(roomId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== this.props.detail) {
      const detail = nextProps.detail;
      if (detail) {
        this.setState({
          id: detail.id,
          name: detail.name,
          room: detail.room,
          describtion: detail.describtion,
          type: detail.type
        })
      }
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
  onSelectType = (item) => {
    this.setState({
      type: item.code
    })
  }

  formValidate = () => {
    const state = this.state;
    let valid = state.name !== '' && state.room !== '' && state.describtion !== '' && state.type !== '';
    this.setState({
      formValid: valid
    });

    return valid;
  }

  handleSubmit = (e) => {
    const state = this.state;
    if (this.formValidate()) {
      if (state.isUpdate) {
        const data = {
          id: state.id,
          name: state.name,
          room: state.room,
          describtion: state.describtion,
          type: state.type
        }
        this.props.update(data);
      } else {
        const data = {
          name: state.name,
          room: state.room,
          describtion: state.describtion,
          type: state.type
        }
        this.props.create(data);
      }
    }
    
    e.preventDefault();
  }

  render() {
    const { t } = this.props;
    const {
      isUpdate,
      formValid,
      name,
      room,
      describtion,
      type
    } = this.state;
    let selectedType = null;
    for (let i = 0; i < ROOM_TYPE.length; i ++) {
      if (ROOM_TYPE[i].code === type) {
        selectedType = ROOM_TYPE[i];
      }
    } 
    return(
      <Layout title="">
        <form className='form-content' onSubmit={this.handleSubmit}>
          <h3 className='form-title'>{isUpdate ? t('Update-Room') : t('Add-Room')}</h3>
          <div className='form-group'>
            <label className='field-title'>{t('Name')}</label>
            <input type='text' className='form-control' value={name} name='name' onChange={this.handleChange}/>
            {
              !formValid && name === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Code')}</label>
            <input type='text' className='form-control' value={room} name='room' onChange={this.handleChange}/>
            {
              !formValid && room === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Type')}</label>
            <div className="btn-group dropdown-custom">
              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {selectedType ? selectedType.name : t('Select-Type')}
              </button>
              <div className="dropdown-menu">
                {
                  ROOM_TYPE.map((item, index) => {
                    return <span key={index} className="dropdown-item" onClick={() => this.onSelectType(item)}>{item.name}</span>
                  })
                }
              </div>
            </div>
            {
              !formValid && type === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Des')}</label>
            <textarea row='4' className='form-control' name='describtion' maxLength="500"
              value={describtion} onChange={this.handleChange} />
            {
              !formValid && describtion === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>

          <div className='form-group btn-form-group'>
            <button type="submit" className="btn btn-primary">{t('Submit')}</button>
            <button type="cancel" className="btn btn-secondary" onClick={() => history.push({ pathname: '/rooms'})}>{t('Cancel')}</button>
          </div>
          
        </form>
      </Layout>
    );
  }

}
const mapStateToProps = state => {
  return {
    detail: state.Rooms.detail,
    error: state.Notifys.error,
    message: state.Notifys.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(FormRoom);