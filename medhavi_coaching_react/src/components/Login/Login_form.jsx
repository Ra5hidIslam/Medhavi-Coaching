import React, {useState} from 'react'
import LoginCSS from './Login.module.css'
import { getLogin } from '../client/getLogin';

// convert this into a form and then convert the data into json,
//  sent the data to the logState function and then get the z
const initialFormData = Object.freeze({
  email:"",
  password:""
});

function Login_form({logState}) {
  const [formData,updateFormData] = useState(initialFormData);

  const handleChange =(e)=>{
    updateFormData({
      ...formData,
      //Trimming any whitespace
      [e.target.name]:e.target.value.trim(),
    });
    console.log(formData);
  };
  const handleSubmit =(e)=>{
    e.preventDefault();
    // const data = new formData(e.target);
    // console.log(formData);\
    // write code to fetch the api
    getLogin(formData);
  };
  return (
          <div className={logState ? LoginCSS.active: LoginCSS.non_active} >
            <form>
              <label>
                  Username
                  <input name = "email" value = {formData.value} onChange={handleChange}/>
              </label>
              <label>
                  Password
                  <input type = "password" name = "password" value = {formData.value}  onChange={handleChange}/>
              </label>
              <div>
                  <button onClick={handleSubmit}>Submit</button>
              </div>
          </form>
          </div>
  )
}

export default Login_form