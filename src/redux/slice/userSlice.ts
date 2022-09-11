import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserInfo } from '../../types'

interface UserState {
  userInfo: UserInfo
}

const initialState: UserState = {
  userInfo: {} as UserInfo,
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action = { payload: {}, type: '' }) => {
      state.userInfo = Object.assign({},action.payload)
    }
  },
})

export const { setUserInfo } = userInfoSlice.actions

export const selectUser = (state: RootState) => state.userInfo

export default userInfoSlice.reducer