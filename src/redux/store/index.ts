import { configureStore } from '@reduxjs/toolkit'
import userRedecer from '../slice/userSlice'
// ...

export const store = configureStore({
  reducer: {
    userInfo:userRedecer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch