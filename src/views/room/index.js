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
import actions from '../../store/room/actions';
import notifyActions from '../../store/notification/actions';
import { DEFAULT_TABLE, ROOM_TYPE } from '../../utils/constant';

class Room extends Component {

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
      this.props.fetchRooms(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
    }
  }
  onRequestSearch = () => {
    this.props.fetchRooms(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
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
    this.props.fetchRooms(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== '' && nextProps.error !== this.props.error) {
      toast(nextProps.error);
      this.props.clearNotify();
    }
    if (nextProps.message !== '' && nextProps.message !== this.props.message) {
      toast(nextProps.message);
      this.props.clearNotify();
      this.props.fetchRooms(this.state.searchKey, this.state.pageNum - 1, this.state.pageSize);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.pageSize !== this.state.pageSize || nextState.pageNum !== this.state.pageNum) {
      let start = (nextState.pageNum - 1) * nextState.pageSize;
      let limit = nextState.pageSize;
      this.props.fetchRooms(nextState.searchKey, start, limit);
    }
  }
  
  render() {

    const { t, rooms, total } = this.props;
    const columns = [
      {
        Header: t('Name'),
        accessor: 'name',
        Cell: props => <div className='table-right-element'>
          {props.value}
        </div>
      },
      // {
      //   Header: t('Code'),
      //   accessor: 'room',
      //   Cell: props => <div className='table-right-element'>
      //     {props.value}
      //   </div>
      // },
      {
        Header: t('Type'),
        accessor: 'type',
        Cell: props => <div className='table-right-element'>
          {
            ROOM_TYPE.map((item, index) => {
              return item.code === props.value ? <span key={index}>{item.name}</span> : null
            })
          }
        </div>
      },
      {
        Header: t('Date'),
        accessor: 'createdDate',
        Cell: props => <div className='table-right-element'>
          { props.value }
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
        id: 'roomId',
        Header: t('Action'),
        accessor: row => row.id,
        Cell: props => <div className='action-table-row'>
          {/* <i className="fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title={t('Delete')}
            onClick={() => alert(`Delete item: ${props.value}`)}></i> */}
          <i className="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title={t('Edit')}
            onClick={() => history.push(`/form-room?roomId=${props.value}`)} ></i>
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
          <h3>{t('ListRooms')}</h3>
          <SearchBar placeHolder={t('Search')} onChange={this.onSearchChange}
            onKeyDown={this.onEnter}
            onRequestSearch={this.onRequestSearch}/>
          <button type="button" className="btn btn-success"
            onClick={() => history.push({ pathname: '/form-room'})}>{t('AddNew')}</button>
        </div>
        <ReactTable
          data={rooms}
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
                <button className="dropdown-item" href="#" onClick={(e) => this.onChangePageSize(5)}>{`5 ${t('rowsText')}`}</button>
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

Room.propTypes = {
  rooms: PropTypes.array
};

const mapStateToProps = state => {
  return {
    rooms: state.Rooms.list,
    total: state.Rooms.total,
    error: state.Notifys.error,
    message: state.Notifys.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRooms: (searchKey, start, limit) => {
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
  connect(mapStateToProps,mapDispatchToProps)
)(Room);
