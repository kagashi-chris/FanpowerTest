import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import playerReducer from "./Player";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  players: playerReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, middleware);

let persistor = persistStore(store);
export default store;
export { persistor };
