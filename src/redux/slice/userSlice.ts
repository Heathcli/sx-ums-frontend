import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../pages/User/UserList/types'
import http from '../../libs/http'

interface UserState {
  userInfo: IUser | {}
}

const initialState: UserState = {
  userInfo: {},
}

export const counterSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action = { payload: {}, type: '' }) => {
      state = action.payload
    }
  },
})

export const { setUserInfo } = counterSlice.actions

export const selectCount = (state: RootState) => state.userInfo

export default counterSlice.reducer