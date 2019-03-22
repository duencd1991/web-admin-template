import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import 'react-table/react-table.css';
import { withTranslation } from 'react-i18next';
import Layout from '../layout/layout';
import SearchBar from '../../components/searchBar/searchBar';
import history from '../../utils/history';
import actions from '../../store/algorithm/actions';
import notifyActions from '../../store/notification/actions';
import { DEFAULT_TABLE, STATUS } from '../../utils/constant';

class Algorithm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      pageNum: DEFAULT_TABLE.pageNum,
      pageSize: DEFAULT_TABLE.pageSize
    }
  }

  onChangePageSize = (size) => {
    this.setState({
      pageSize: size,
      pageNum: DEFAULT_TABLE.pageNum
    })
  }
  onChangePageNum = (pageNum) => {
    this.setState({
      pageNum: pageNum
    })
  }

  onSearchChange = (e) => {
    this.setState({
      searchKey: e.target.value
    })
  }
  onEnter = (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
      this.props.fetchAlgorithm(this.state.searchKey, this.state.pageNum -1, this.state.pageSize);
    }
  }
  onRequestSearch = () => {
    this.props.fetchAlgorithm(this.state.searchKey, this.state.pageNum -1, this.state.pageSize);
  }

  componentDidMount() {
    this.props.fetchAlgorithm(this.state.searchKey, this.state.pageNum -1, this.state.pageSize);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== '' && nextProps.error !== this.props.error) {
      toast(nextProps.error);
      this.props.clearNotify();
    }
    if (nextProps.message !== '' && nextProps.message !== this.props.message) {
      toast(nextProps.message);
      this.props.clearNotify();
      this.props.fetchAlgorithm(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.pageSize !== this.state.pageSize || nextState.pageNum !== this.state.pageNum) {
      let start = (nextState.pageNum - 1) * nextState.pageSize;
      let limit = nextState.pageSize
      this.props.fetchAlgorithm(nextState.searchKey, start, limit);
    }
  }

  render() {

    const { t, algorithms, total } = this.props;
    const columns = [
      {
        Header: t('Name'),
        accessor: 'name',
        Cell: props => <div className='table-right-element'>
          {props.value}
        </div>
      },
      {
        Header: t('Value'),
        accessor: 'value',
        Cell: props => <div className='table-right-element'>
          {props.value}
        </div>
      },
      {
        id: 'algorithmStatus',
        Header: t('Status'),
        accessor: row => [row.id, row.status],
        Cell: props => <div className='status-table-row'>
          <span className={props.value[1] ? 'active' : 'deactive'}>{props.value[1] ? t('Active') : t('Deactivate')}</span>
          {
            props.value[1] ? <i className="fas fa-pause" data-toggle="tooltip" data-placement="bottom" title={t('Deactivate')}
              onClick={() => this.props.changeStatus(props.value[0], STATUS.deactive)}></i>
              : <i className="fas fa-play" data-toggle="tooltip" data-placement="bottom" title={t('Active')}
                onClick={() => this.props.changeStatus(props.value[0], STATUS.active)}></i>
          }
        </div>
      },
      {
        Header: t('Des'),
        accessor: 'description',
        Cell: props => <div className='table-right-element'>
          {props.value}
        </div>
      },
      {
        Header: t('Date'),
        accessor: 'createdDate',
        Cell: props => <div className='table-right-element'>
          {props.value}
        </div>
      },
      
      {
        id: 'algorithmId',
        Header: t('Action'),
        accessor: row => row.id,
        Cell: props => <div className='action-table-row'>
          {/* <i className="fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title={t('Delete')}
            onClick={() => alert(`Delete item: ${props.value}`)}></i> */}
          <i className="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title={t('Edit')}
            onClick={() => history.push(`/form-algorithm?algorithmId=${props.value}`)} ></i>
        </div>
      }
    ];

    const {
      pageNum,
      pageSize
    } = this.state;

    return (
      <Layout title="">
        <div className='header-form'>
          <h3>{t('ListAlgorithm')}</h3>
          <SearchBar placeHolder={t('Search')} onChange={this.onSearchChange}
            onKeyDown={this.onEnter}
            onRequestSearch={this.onRequestSearch} />
          <button type="button" className="btn btn-success"
            onClick={() => history.push({ pathname: '/form-algorithm' })}>{t('AddNew')}</button>
        </div>
        <ReactTable
          data={algorithms}
          columns={columns}
          previousText={t('preText')}
          nextText={t('nextText')}
          noDataText={t('noData')}
          pageText={t('pageText')}
          ofText={t('ofText')}
          rowsText={t('rowsText')}
          pageSize={pageSize}
          showPagination={false}
          resizable={false} >
        </ReactTable>
        <div className="d-flex flex-row-reverse">
          <Pagination
            firstPageText={<i className="fas fa-angle-double-left"></i>}
            lastPageText={<i className="fas fa-angle-double-right"></i>}
            prevPageText={<i className="fas fa-angle-left"></i>}
            nextPageText={<i className="fas fa-angle-right"></i>}
            activePage={pageNum}
            itemsCountPerPage={pageSize}
            totalItemsCount={total}
            onChange={this.onChangePageNum}
          />
          <div className='form-group sort-by'>
            <label>{t('sortBy')}</label>
            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownRows" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {`${pageSize} ${t('rowsText')}`}
              </button>
              <div className="dropdown-menu dropdown-menu-right select-row" aria-labelledby="dropdownRows">
                <button className="dropdown-item" onClick={(e) => this.onChangePageSize(5)}>{`5 ${t('rowsText')}`}</button>
                <button className="dropdown-item" onClick={(e) => this.onChangePageSize(10)}>{`10 ${t('rowsText')}`}</button>
                <button className="dropdown-item" onClick={(e) => this.onChangePageSize(15)}>{`15 ${t('rowsText')}`}</button>
                <button className="dropdown-item" onClick={(e) => this.onChangePageSize(20)}>{`20 ${t('rowsText')}`}</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Algorithm.propTypes = {
  algorithms: PropTypes.array
};

const mapStateToProps = state => {
  return {
    algorithms: state.Algorithms.list,
    total: state.Algorithms.total,
    error: state.Notifys.error,
    message: state.Notifys.message    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlgorithm: (searchKey, start, limit) => {
      dispatch(actions.list(searchKey, start, limit));
    },
    changeStatus: (id, status) => {
      dispatch(actions.changeStatus(id, status));
    },
    clearNotify: () => {
      dispatch(notifyActions.clearNotify());
    }
  }
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(Algorithm);
