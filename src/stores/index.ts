import { createPinia } from 'pinia'

const store = createPinia()

export const setupStore = ( app: any) => {
  app.use(store)
}

export { store }