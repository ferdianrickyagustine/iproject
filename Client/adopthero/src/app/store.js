import { configureStore } from '@reduxjs/toolkit'
import pets from "../features/pet.js"

export const store = configureStore({
  reducer: {
    pets
  },
})