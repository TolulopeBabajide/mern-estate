import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  currentUser: null,  // Stores the current user's information
  error: null,         // Stores any error that occurs during actions
  loading: false       // Indicates if an asynchronous action is in progress
};

// Create a Redux slice for user-related actions
const userSlice = createSlice({
  name: 'user',         // Name of the slice
  initialState,         // Initial state defined above
  reducers: {
    // Actions related to signing in a user
    signInStart: (state) => {
      state.loading = true;  // Set loading to true during sign in start
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;  // Set the current user on sign in success
      state.loading = false;               // Reset loading to false
      state.error = null;                  // Reset error to null
    },
    signInFailure: (state, action) => {
      state.error = action.payload;        // Set the error on sign in failure
      state.loading = false;               // Reset loading to false
    },

    // Actions related to updating user information
    updateUserStart: (state) => {
      state.loading = true;  // Set loading to true during update start
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;  // Set the updated user information
      state.loading = false;               // Reset loading to false
      state.error = null;                  // Reset error to null
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;        // Set the error on update failure
      state.loading = false;               // Reset loading to false
    },

    //Actions related to deleting user account
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state)=>{
      state.loading=true;
    },
    signOutSuccess:(state)=> {
      state.currentUser =null;
      state.loading=false;
      state.error=null;
    },
    signOutFailure:(state, action)=>{
      state.error=action.payload;
      state.loading=false;
    }
  },
});

// Export individual action creators for use in components or middleware
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

// Export the user reducer to be used in the Redux store
export default userSlice.reducer;
