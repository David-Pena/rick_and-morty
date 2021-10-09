import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: []
  },
  mutations: {
    SET_CHARACTERS(state, payload) {
      state.characters = payload
    },
    SET_CHARACTERS_FILTER(state, payload) {
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({commit}) {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        commit('SET_CHARACTERS', data.results)
        commit('SET_CHARACTERS_FILTER', data.results)
      }catch (error) {
        console.log(error)
      }
    },
    filterByStatus({commit, state}, status) {
      const results = state.characters.filter((character) => {
        return character.status.includes(status)
      })
      commit('SET_CHARACTERS_FILTER', results)
    },
    filterByName({commit, state}, name) {
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase()

        if (characterName.includes(formatName)) {
          return character
        }
      })
      commit('SET_CHARACTERS_FILTER', results)
    }
  },
  modules: {
  }
})
