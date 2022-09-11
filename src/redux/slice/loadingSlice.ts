import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const LoadingSlice = createSlice({
  name: 'loading',
  initialState:false,
  reducers: {
    setLoading: (state, action = { payload: {}, type: '' }) => {
      return (state = action.payload)
    }
  },
})

export const { setLoading } = LoadingSlice.actions

export const selectLoading = (state: RootState) => state

export default LoadingSlice.reducer