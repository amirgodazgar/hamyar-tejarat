import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      token : '',
      formType : '',
      // {
      //    signIn : 'signIn',
      //    signUp : 'signUp',
      //    forgotPassword : 'forgotPassword',
      //    successSignUp : 'successSignUp',
      //    activeAccount : 'activeAccount',
      // },
   },
   reducers : {
      changeFormType : (state, action) => {
         state.formType = action.payload
      }
   }
})

export const {changeFormType} = authSlice.actions
export default authSlice.reducer