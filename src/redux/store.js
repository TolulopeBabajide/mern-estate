import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers, in this case, there's only the 'user' reducer
const rootReducer = combineReducers({ user: userReducer });

// Configuration for Redux persist
const persistConfig = {
  key: 'root',      // Key for the persisted state
  storage,          // Storage engine (defaults to localStorage)
  version: 1,       // Version of the persisted state
};

// Create a persisted reducer using the configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create the Redux store
export const store = configureStore({
  reducer: persistedReducer,  // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable the serializable check for Redux persist
    }),
});

// Create a persistor for the Redux store
export const persistor = persistStore(store);
