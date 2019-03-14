const actions = {
  ACTIVE_MENU: 'ACTIVE_MENU',
  HIDE_MENU: 'HIDE_MENU',
  SHOW_MENU: 'SHOW_MENU',

  activeMenu: () => ({
    type: actions.ACTIVE_MENU
  }),
  hideMenu: () => ({
    type: actions.HIDE_MENU
  }),
  showMenu: () => ({
    type: actions.SHOW_MENU
  })
}
export default actions;