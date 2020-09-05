import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { alertActions, validationActions } from '../_actions';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Calendar } from 'primereact/calendar';

function MainPage() {
    const [inputs, setInputs] = useState({
        plate: '',
        date: new Date(),
        time: new Date(),
    });
    const { plate, date,time } = inputs;
const [result,setResult] = useState('');


    const [submitted, setSubmitted] = useState(false);
    const alert = useSelector(state => state.alert);

    const dispatch = useDispatch();
 
    
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    

    function handleSubmit(e) {
        e.preventDefault();
  setSubmitted(true);
        if (plate && date && time) {
            
 dispatch(validationActions.validate(plate, date,time ));
 }
    }



    function handleReset(e) {
        e.preventDefault();
        setInputs(inputs => ({ ...inputs, plate: '' }));
        dispatch(alertActions.clear());
    }

    return (
        <div className="col-lg-8 offset-lg-2" >

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:20}}>
            <h2>Pico y placa</h2>
            </div>
            <form name="form" >
                <div className="form-group">
                    <label>License plate number</label>
                     <input type="text" id="plate" name="plate" value={plate} onChange={handleChange} className={'form-control' + (submitted && !plate ? ' is-invalid' : '')} />
                    {submitted && !plate &&
                        <div className="invalid-feedback">Required field</div>
                    }
                </div>
                <div className="form-group" >
                   
                    <div>
                    <label>Date</label>
                    </div>
                    <Calendar value={date} inputId="date" name={'date'}  onChange={handleChange}/>
                    {submitted && !date &&
                        <div className="invalid-feedback">Required field</div>
                    }
                </div>

                <div className="form-group">
                <div>
                    <label>Time</label>
                    </div>
                  <Calendar timeOnly showTime hourFormat="24" value={time} inputId="time" name={'time'} onChange={handleChange}/>
                    {submitted && !time &&
                        <div className="invalid-feedback">Required field</div>
                    }
                </div>

                <div  style={{display:'flex',justifyContent:'space-around'}}>
                    <button type="button" id="checkButton"  className="btn btn-primary" onClick={handleSubmit}>Check</button>

                     <button type="button" id="checkButton" className="btn btn-secondary" onClick={handleReset}>Reset</button> 

                </div>
            </form>

            
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column',marginTop:20}}>
              {alert?.message&&<div   id="checkresponse" className={`alert ${alert.type}`}><h4>{alert.message}</h4></div>}
              {alert?.type=='alert-success'&&<img src={ require('../images/yescar.jpg') } height='250' width='250'/>}
              {(alert?.type=='alert-warning' || alert?.type=='alert-error')&&<img src={ require('../images/nocar.png') } height='250' width='250'/>}
              </div>
              
                

        </div>
    );
}

export { MainPage };
