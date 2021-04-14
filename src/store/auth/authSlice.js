import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      token : '',
      type : {
         signIn : 'signIn',
         signUp : 'signUp',
         forgotPassword : 'forgotPassword',
         successSignUp : 'successSignUp',
         activeAccount : 'activeAccount',
      },
   },
   reducers : {
      changeAuthType : (state, action) => {
         // state.type = action.payload
      }
   }
})

export const {changeAuthType} = authSlice.actions
export default authSlice.reducer