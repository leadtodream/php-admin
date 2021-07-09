const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  device: 'desktop',
  is_fold_aside: false,
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  toggleAside(state) {
    state.is_fold_aside = !state.is_fold_aside
  },
}

const actions = {
  toggleAside({ commit }) {
    commit('toggleAside')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
