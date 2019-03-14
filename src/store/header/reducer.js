import actions from './actions';

const initState = {
  activeMenu: false,
  showMenu: false
}

const Header = (state = initState, action) => {
  switch(action.type) {
    case actions.ACTIVE_MENU:
      return { ...state, activeMenu: action.active};
    case actions.HIDE_MENU:
      return { ...state, showMenu: false };
    case actions.SHOW_MENU:
      return { ...state, showMenu: true };
    default:
      return state;
  }
}

export default Header;