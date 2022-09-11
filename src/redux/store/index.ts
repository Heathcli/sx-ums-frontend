import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../slice/userSlice'
import loadingReducer from '../slice/loadingSlice'

export const store = configureStore({
  reducer: {
    userInfo:userInfoReducer,
    loading:loadingReducer
  },
  middleware:(getDefalutMiddleware)=>
    getDefalutMiddleware({
      serializableCheck:false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch