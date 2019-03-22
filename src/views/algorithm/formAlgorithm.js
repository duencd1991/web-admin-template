import React, { Component } from 'react';
import Layout from '../layout/layout';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { compose } from 'redux';
import history from '../../utils/history';
import { withTranslation } from 'react-i18next';
import actions from '../../store/algorithm/actions';
import notifyActions from '../../store/notification/actions';

class FormAlgorithm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      formValid: true,
      id: '',
      name: '',
      value: '',
      describtion: ''
    }
  }

  componentDidMount() {
    const url = new URL(window.location);
    const algorithmId = url.searchParams.get("algorithmId");
    if (algorithmId) {
      this.setState({
        isUpdate: true
      })
      this.props.get(algorithmId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== this.props.detail) {
      const detail = nextProps.detail;
      if (detail) {
        this.setState({
          id: detail.id,
          name: detail.name,
          describtion: detail.describtion,
          value: detail.value
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

  formValidate = () => {
    const state = this.state;
    let valid = state.name !== '' && state.value !== '' && state.describtion;
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
          describtion: state.describtion,
          value: state.value
        }
        this.props.update(data);
      } else {
        const data = {
          name: state.name,
          describtion: state.describtion,
          value: state.value
        }
        this.props.create(data);
      }
    }
    e.preventDefault();
  }

  render() {
    const {
      isUpdate,
      formValid,
      name,
      value,
      describtion
    } = this.state;
    const { t } = this.props;

    return (
      <Layout title="">
        <form className='form-content' onSubmit={this.handleSubmit}>
          <h3 className='form-title'>{isUpdate ? t('Update-Algorithm') : t('Add-Algorithm')}</h3>
          <div className='form-group'>
            <label className='field-title'>{t('Name')}</label>
            <input type='text' className='form-control' value={name} name='name' onChange={this.handleChange} />
            {
              !formValid && name === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Des')}</label>
            <textarea row='4' className='form-control' value={describtion} maxLength="500"
              name='describtion' onChange={this.handleChange} />
            {
              !formValid && describtion === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>
          <div className='form-group'>
            <label className='field-title'>{t('Value')}</label>
            <input type='text' className='form-control' value={value} name='value' onChange={this.handleChange} />
            {
              !formValid && value === '' && <div className='block-error'>{t('Field-Required')}</div> 
            }
          </div>

          <div className='form-group btn-form-group'>
            <button type="submit" className="btn btn-primary">{t('Submit')}</button>
            <button type="cancel" className="btn btn-secondary" onClick={() => history.push({ pathname: '/algorithms' })}>{t('Cancel')}</button>
          </div>

        </form>
      </Layout>
    );
  }

}

const mapStateToProps = state => {
  return {
    detail: state.Algorithms.detail,
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
)(FormAlgorithm);