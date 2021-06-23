import Api from "../../api"
import Utils from "../../helpers/utils"

function getDefaultState() {
  return {
    eventList: [],
    totalEvents: null,
  }
}

const instructorEvent = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    FLUSH_STATE(state) {
      Object.assign(state, getDefaultState())
    },
    SET_EVENTS_LIST(state, eventList) {
      state.eventList = eventList
    },
    SET_EVENTS_TOTAL(state, total) {
      state.totalEvents = total
    },
  },
  actions: {
    flushState({ commit }) {
      commit("FLUSH_STATE")
    },
    async getPastEvents({ commit, state }, daysAgo) {
      // :Number daysAgo: days ago to get the events from (e.g., 21 means all events 3 weeks ago until today)
      const startDateString = Utils.dateToApiString(Utils.addDaysToToday(-daysAgo))
      const endDateString = Utils.dateToApiString(Utils.addDaysToToday(0))
      const params = {
        start_time__gte: startDateString,
        start_time__lte: endDateString,
      }
      let res = await Api.instructorEvent.getEventList(params)
      commit("SET_EVENTS_LIST", res.data.results)
      commit("SET_EVENTS_TOTAL", res.data.count)
      return state.eventList
    },
  },
}

export default instructorEvent