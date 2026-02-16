// stores/theme.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // Default color (Home)
    ballColor: '#20afdb',
    activePage: 'home'
  }),
  actions: {
    setPage(page) {
      this.activePage = page
      if (page === 'home') this.ballColor = '#20afdb'
      if (page === 'creation') this.ballColor = '#225cae'
      if (page === 'campaign') this.ballColor = '#57da3d'
    }
  }
})