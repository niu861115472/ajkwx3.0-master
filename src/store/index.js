import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../redux';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)


export default function configureStore(initialState) {
  return finalCreateStore(reducers,initialState)
}