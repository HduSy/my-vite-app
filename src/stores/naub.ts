import { defineStore } from 'pinia';

export const useNaubStore = defineStore('Naub', {
  state: () => ({
    message: 'Hello Pinia'
  }),
  getters: {
    fullMessage: (state) => `The message is ${state.message}`,
    emojiMessage(): string {
      return `🎉🎉🎉 ${this.fullMessage}`
    }
  },
  actions: {
    updateMessageSync(newMessage: string): string {
      this.message = newMessage
      return `Sync done`
    },
    async updateMessageASync(newMessage: string): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.message = newMessage
          resolve('Async done')
        }, 1000)
      })
    }
  },
});
