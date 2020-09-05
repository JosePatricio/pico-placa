import { combineReducers } from 'redux';

import { validation } from './validation.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    validation,
    alert
});

export default rootReducer;