import { defineStore } from "pinia";

export const useUserInfo = defineStore({
  id: 'user',
  state() {
    return {
      firstName: '',
      lastName: ''
    }
  },
  getters: {
    'fullName': (state) => {
      return `My name is ${state.firstName}, ${state.lastName}`
    }
  },
  actions: {
    updateName(name: string) {
      const [firstName, lastName] = name.split(',')
      this.firstName = firstName
      this.lastName = lastName
    }
  }
})