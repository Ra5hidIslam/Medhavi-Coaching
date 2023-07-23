import React, {useEffect, useState} from 'react'
import LoginFormCSS from '../Login/LoginForm.module.css';
import { getLogin } from '../client/getLogin';
import { loadHomeFeed } from '../client/loadHomeFeed';

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
    const handleSubmit = async (e)=>{
      // e.preventDefault();
      // const data = new formData(e.target);
      // console.log(formData);\
      // write code to fetch the api
      const loginstate  = await getLogin(formData);
      if(loginstate){
        // console.log()
        window.location.reload(false);
        // console.log("Logged In")
      }
      else{
        alert("Login failed");
      }
    };

    // useEffect(()=>{
    //   // runs on render and change of logState 
    // },[logState]);

    return (
            <div >
              <form>
                <div>
                  <label className={LoginFormCSS.username}>
                      Username
                      <input name = "email" value = {formData.value} onChange={handleChange}/>
                  </label>
                </div>
                <div>
                  <label className={LoginFormCSS.password}>
                      Password
                      <input type = "password" name = "password" value = {formData.value}  onChange={handleChange}/>
                  </label>
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            </div>
    )
}

export default Login_form