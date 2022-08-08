import { configureStore } from '@reduxjs/toolkit'
import userInfoRedecer from '../slice/userSlice'
// ...

export const store = configureStore({
  reducer: {
    userInfo:userInfoRedecer
  },
  middleware:(getDefalutMiddleware)=>
    getDefalutMiddleware({
      serializableCheck:false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch