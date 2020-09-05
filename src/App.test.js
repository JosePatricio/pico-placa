import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MainPage } from './MainPage/MainPage';
import { validation } from './_reducers/validation.reducer';
import { validationService } from './_services';

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<Component /> unit test', () => {
 
    const getWrapper = (mockStore = createStore(validation, { message: '' })) => mount(
    <Provider store={mockStore}>
      <MainPage/>
    </Provider>
  );


  let wrapper,plateInput,dateInput,timeInput;
  beforeEach(()=>{
    
    const mockStore = createStore(validation, { message: '' });
    mockStore.dispatch = jest.fn();
     wrapper = getWrapper(mockStore);

    plateInput = wrapper.find('#plate');
    dateInput = wrapper.find('#date').first();
    timeInput = wrapper.find('#time').first();
  });

 
  test('Should allow plate ICC-088 drive at 09/03/2020  -  14:20', () => {
    const testPlateValue='ICC-088',testDateValue='09/03/2020',testTimeValue='14:20';   
    
    plateInput.simulate('change', {target: {name: 'plate',value: testPlateValue}}); 
    dateInput.simulate('blur', {target: {name: 'date',value: testDateValue}});
    timeInput.simulate('blur', { target: {name: 'time', value: testTimeValue } } ); 

    const formatedTime= `Sat Sep 05 2020 ${timeInput.render().val()} GMT-0500 (Colombia Standard Time)`
    const checkResponse=validationService.validate(plateInput.render().val(),dateInput.render().val(),formatedTime);
  
    expect((checkResponse.resultDay &&  checkResponse.resultTime)).toEqual(true);

   }); 
 


   test('Should allow plate ICC-088 drive at 09/03/2020 , but not at this time 08:50  ', () => {
   const testPlateValue='ICC-088',testDateValue='09/03/2020',testTimeValue='08:50';   
  
   plateInput.simulate('change', {target: {name: 'plate',value: testPlateValue}}); 
   dateInput.simulate('blur', {target: {name: 'date',value: testDateValue}});
   timeInput.simulate('blur', { target: {name: 'time', value: testTimeValue } } ); 

   const formatedTime= `Sat Sep 05 2020 ${timeInput.render().val()} GMT-0500 (Colombia Standard Time)`
   const checkResponse=validationService.validate(plateInput.render().val(),dateInput.render().val(),formatedTime);
 
 
   expect((checkResponse.resultDay&& !checkResponse.resultTime)).toEqual(true);

  });  


  test('Should not allow plate ICC-088 drive at 09/05/2020 ', () => {
    const testPlateValue='ICC-088',testDateValue='09/05/2020',testTimeValue='08:50';   
   
    plateInput.simulate('change', {target: {name: 'plate',value: testPlateValue}}); 
    dateInput.simulate('blur', {target: {name: 'date',value: testDateValue}});
    timeInput.simulate('blur', { target: {name: 'time', value: testTimeValue } } ); 
 
    const formatedTime= `Sat Sep 05 2020 ${timeInput.render().val()} GMT-0500 (Colombia Standard Time)`
    const checkResponse=validationService.validate(plateInput.render().val(),dateInput.render().val(),formatedTime);
  
  
    expect((!checkResponse.resultDay)).toEqual(true);
 
   });  


});
