import { validationConstants } from '../_constants';

const initialState = {};

export function validation(state = initialState, action) {
    
    switch (action.type) {
        case validationConstants.VALIDATION_REQUEST:
            return {
                plate: action.plate
            };
        case validationConstants.VALIDATION_SUCCESS:
            return {
                plate: action.plate
            };
        case validationConstants.VALIDATION_FAILURE:
            return {};
        default:
            return state
    }
}