import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { withTranslation } from 'react-i18next';
import Layout from '../layout/layout';
import SearchBar from '../../components/searchBar/searchBar';
import history from '../../utils/history';
import actions from '../../store/robot/actions';
import notifyActions from '../../store/notification/actions';
import { DEFAULT_TABLE } from '../../utils/constant';

class Robot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      pageNum: DEFAULT_TABLE.pageNum,
      pageSize: DEFAULT_TABLE.pageSize
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
      this.props.fetchRobots(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
    }
  }
  onRequestSearch = () => {
    this.props.fetchRobots(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
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

  componentDidMount() {
    this.props.fetchRobots(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== '' && nextProps.error !== this.props.error) {
      toast(nextProps.error);
      this.props.clearNotify();
    }
    if (nextProps.message !== '' && nextProps.message !== this.props.message) {
      toast(nextProps.message);
      this.props.clearNotify();
      this.props.fetchRobots(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.pageSize !== this.state.pageSize || nextState.pageNum !== this.state.pageNum) {
      let start = (nextState.pageNum - 1) * nextState.pageSize;
      let limit = nextState.pageSize;
      this.props.fetchRobots(nextState.searchKey, start, limit);
    }
  }
  
  render() {

    const { t, robots, total } = this.props;
    const columns = [
      {
        Header: t('Rooms'),
        accessor: 'roomName'
      },
      {
        Header: t('Algorithms'),
        accessor: 'algorithmNumber',
        Cell: props => <div className='table-center-element'>
          {props.value}
        </div>
      },
      {
        Header: t('Algorithms-Values'),
        accessor: 'algorithmValues',
        Cell: props => <div className='table-left-element'>
          { props.value }
        </div>
      },
      {
        Header: t('Date'),
        accessor: 'createDate',
        Cell: props => <div className='table-right-element'>
          {props.value}
        </div>
      },
      {
        id: 'robotId',
        Header: t('Action'),
        accessor: row => row.roomId,
        Cell: props => <div className='action-table-row'>
          {/* <i className="fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title={t('Delete')}
            onClick={() => alert(`Delete item: ${props.value}`)}></i> */}
          <i className="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title={t('Edit')}
            onClick={() => history.push(`/form-robot?roomId=${props.value}`)} ></i>
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
          <h3>{t('ListRobots')}</h3>
          <SearchBar placeHolder={t('Search')} onChange={this.onSearchChange}
            onKeyDown={this.onEnter}
            onRequestSearch={this.onRequestSearch}/>
          <button type="button" className="btn btn-success"
            onClick={() => history.push({ pathname: '/form-robot'})}>{t('AddNew')}</button>
        </div>
        <ReactTable
          data={robots}
          columns={columns}
          defaultPageSize={5}
          previousText={t('preText')}
          nextText={t('nextText')}
          noDataText={t('noData')}
          pageText={t('pageText')}
          ofText={t('ofText')}
          rowsText={t('rowsText')}
          pageSize={pageSize}
          showPagination={false}
          resizable={false}>
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

Robot.propTypes = {
  robots: PropTypes.array
};

const mapStateToProps = state => {
  return {
    robots: state.Robots.list,
    total: state.Robots.total,
    error: state.Notifys.error,
    message: state.Notifys.message
  };
};

const mapDispatchToProps = dispatch=> {
  return {
    fetchRobots: (searchKey, start, limit) => {
      dispatch(actions.list(searchKey, start, limit));
    },
    clearNotify: () => {
      dispatch(notifyActions.clearNotify());
    }
  }
};

export default compose(
  withTranslation(),
  connect(mapStateToProps,mapDispatchToProps)
)(Robot);
