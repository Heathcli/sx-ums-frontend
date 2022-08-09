import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUserInfo } from '../../types'

interface UserState {
  userInfo: IUserInfo
}

const initialState: UserState = {
  userInfo: {} as IUserInfo,
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