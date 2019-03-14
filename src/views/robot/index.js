import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { withTranslation } from 'react-i18next';
import Layout from '../layout/layout';
import SearchBar from '../../components/searchBar/searchBar';
import history from '../../utils/history';

class Robot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchKey: ""
    }
  }

  onSearchChange = (e) => {
    this.setState({
      searchKey: e.target.value
    })
  }
  onEnter = (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
      alert(this.state.searchKey);
    }
  }
  onRequestSearch = () => {
    alert(this.state.searchKey);
  }
  
  render() {

    const { t } = this.props;
    const columns = [
    {
      Header: t('Name'),
      accessor: 'name'
    },
    {
      Header: t('Rooms'),
      accessor: 'room'
    },
    {
      id: 'algorithms',
      Header: t('Algorithms'),
      accessor: 'algorithms',
      Cell: props => <div className='list-algorithms'>
        {
          props.value.map((item, index) => {
            return <span key={index}>{item}</span>
          })
        }
      </div>
    },
    {
      Header: t('Des'),
      accessor: 'description'
    },
    {
      id: 'robotStatus',
      Header: t('Status'),
      accessor: row => [row.id, row.status],
      Cell: props => <div className='status-table-row'>
        <span className={props.value[1] ? 'active' : 'deactive'}>{props.value[1] ? t('Active') : t('Deactivate')}</span>
        {
          props.value[1] ? <i className="fas fa-pause" data-toggle="tooltip" data-placement="bottom" title={t('Deactivate')}
            onClick={() => alert(`Deactive item: ${props.value[0]}`)}></i>
          : <i className="fas fa-play" data-toggle="tooltip" data-placement="bottom" title={t('Active')}
            onClick={() => alert(`Active item: ${props.value[0]}`)}></i>
        }
      </div>
    },
    {
      Header: t('Date'),
      accessor: 'date'
    },
    {
      id: 'robotId',
      Header: t('Action'),
      accessor: row => row.id,
      Cell: props => <div className='action-table-row'>
        <i className="fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title={t('Delete')}
          onClick={() => alert(`Delete item: ${props.value}`)}></i>
        <i className="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title={t('Edit')}
          onClick={() => history.push(`/form-robot?robotId=${props.value}`)} ></i>
      </div>
    }
  ];
    return (
      <Layout title="">
        <div className='header-form'>
          <h3>{t('ListRobots')}</h3>
          <SearchBar placeHolder={t('Search')} onChange={this.onSearchChange}
            onKeyDown={this.onEnter}
            onRequestSearch={this.onRequestSearch}/>
          <button type="button" className="btn btn-success"
            onClick={() => history.push({ pathname: '/form-robot'})}>{t('AddNew')}</button>
        </div>
        <ReactTable
          data={this.props.robots}
          columns={columns}
          defaultPageSize={5}
          previousText={t('preText')}
          nextText={t('nextText')}
          noDataText={t('noData')}
          pageText={t('pageText')}
          ofText={t('ofText')}
          rowsText={t('rowsText')}>
        </ReactTable>
      </Layout>
    );
  }
}

Robot.propTypes = {
  robots: PropTypes.array
};

const mapStateToProps = state => {
  return {
    robots: state.Robots.list
  };
};

const mapDispatchToProps = {};

export default compose(
  withTranslation(),
  connect(mapStateToProps,mapDispatchToProps)
)(Robot);