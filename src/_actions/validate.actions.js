import { validationConstants } from '../_constants';
import {  validationService } from '../_services';
import { alertActions } from '.';

export const validationActions = {
     validate,
   };

function validate(plate, date, time) {
    return dispatch => {
        dispatch(request({ plate }));
        try {
            const response = validationService.validate(plate, date, time);

         
             if(response.resultDay && response.resultTime){
                dispatch(alertActions.success('YES , YOU CAN DRIVE THAT DAY AT THAT TIME ! '));
            }else if(response.resultDay && !response.resultTime){
                dispatch(alertActions.warning('YOU CANNOT DRIVE THAT DAY BETWEEN (7:00am - 9:30am) AND (16:00pm - 19:30)'));
            }else if(!response.resultDay && response.resultTime){
                dispatch(alertActions.warning('YOU CANNOT DRIVE THAT DAY'));
            }else{
                dispatch(alertActions.error('NO , YOU CANNOT DRIVE THAT DAY AT THAT TIME :( '));
            }  
         
            dispatch(success(plate));

        } catch (error) {
            dispatch(failure(plate));
        }
       
     
        
    };

    function request(plate) { return { type: validationConstants.VALIDATION_REQUEST, plate } }
    function success(plate) { return { type: validationConstants.VALIDATION_SUCCESS, plate } }
    function failure(error) { return { type: validationConstants.VALIDATION_FAILURE, error } }
}
