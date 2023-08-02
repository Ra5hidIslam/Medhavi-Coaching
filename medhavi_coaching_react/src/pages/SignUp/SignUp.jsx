import React, { useEffect } from "react";
import SignUpCSS from '../SignUp/SignUp.module.css'
import closeLogo from '../../files/icons/close.png';
import { useState } from "react";
import { getSignUp } from "../../components/client/getSignUp";
import { formToJSON } from "axios";


const initialFormData = Object.freeze({
  firstname:"",
  lastname:"",
  email:"",
  username:"",
  password:""
});

const SignUp = ({ logState,handleLoginClick}) => {
  console.log(logState);

  const [formData,updateFormData] = useState(initialFormData);
  const [signUpPageState, setSignUpPageState] = useState(1);

  const handleChange =(e)=>{
    updateFormData({
      ...formData,
      //Trimming any whitespace
      [e.target.name]:e.target.value.trim(),
    });
    console.log(formData);
  };

  const handleSubmit = async()=>{
    if(formData.firstname == ""){
      console.log("Please enter firstname")
      return;
    }else if(formData.lastname == ""){
      console.log("Please enter lastname")
      return;
    }else if(formData.email == ""){
      console.log("Please enter email")
      return;
    }else if(formData.username == ""){
      console.log("Please enter username")
      return;
    }else if(formData.password == ""){
      console.log("Please enter password")
      return;
    }
    else{
      try{
        const SignUpState = await getSignUp(formData);
        if(SignUpState == "errorCode1"){
          // username already taken
          console.log("Username already taken");
        }
        else if(SignUpState == "errorCode2"){
          // email is invalid
          console.log("email is invalid");
        }
        else{
          // alert("error in Signing you, Sorry");
          console.log("Account created successfully");
          console.log(SignUpState);
        }
      }
      catch(err){
        alert(err.message);
      }
      
    }
   
  }

  const handleNext =()=>{
    if(formData.firstname && formData.lastname && formData.email) setSignUpPageState(2);
  }
  const handlePrev =()=>{
    setSignUpPageState(1);
  }
 
  const handleSignUpClose = ()=>{
    setSignUpPageState(1);
    handleLoginClick();
  }

  const signUpPage = (signUpPageState)=>{
      if(signUpPageState == 1){
        return(
          <div>
            <label>First Name</label>
            <input type="text" name="firstname" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
            <label>Last Name</label>
            <input type="text" name="lastname" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
            <label>email</label>
            <input type="text" name="email" className={SignUpCSS.SignUpBox} onChange={handleChange}/> 
          </div>
          
        )
        
      }
      else if(signUpPageState == 2){
        return(
          <div>
            <label>Username</label>
            <input type="text" name="username" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
            <label>password</label>
            <input type="password" name="password" className={SignUpCSS.SignUpBox} onChange={handleChange}/> 
          </div>
        )
          
          
      }
  }

  const signUpSubmitButton = (signUpPageState)=>{
    if(signUpPageState == 1){
      return (
        <div  className={SignUpCSS.SignUpBtn} onClick={handleNext}>Next</div>
      )
    }else if(signUpPageState ==2){
      return (
        <div className={SignUpCSS.SignUpBtn} onClick={handleSubmit}>Submit</div>
      )
      
    }
    

  }

  // useEffect(()=>{
  //   console.log(signUpPageState);
  // },[signUpPageState])

  return (
    <div className={!logState ? SignUpCSS.active : SignUpCSS.show}>
      <div className={SignUpCSS.SignUpForm}>
        <div className={SignUpCSS.formBox}>
          
          <form>
            <div className={SignUpCSS.SignUpForm}>

              <div className={SignUpCSS.signUpTopLayer}>
                
                <div className={SignUpCSS.closeButton} onClick={handleSignUpClose}>
                <img className={SignUpCSS.closeLogo} src = {closeLogo} alt = "logo"/>
                </div>
                
                {/* <div className={SignUpCSS.closeSteps}>
                  Steps 1 of 2
                </div> */}
              </div>


              <div className={SignUpCSS.signUpBoxMiddleLayer}>
              
                <div>
                  <h1 className={SignUpCSS.SignUpText}>Sign Up</h1>
                </div>

                <div>
                  {signUpPage(signUpPageState)}
                  {/* <label>First Name</label>
                  <input type="text" name="firstname" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
                  <label>Last Name</label>
                  <input type="text" name="lastname" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
                  <label>email</label>
                  <input type="text" name="email" className={SignUpCSS.SignUpBox} onChange={handleChange}/> */}
                </div>  
              </div>

              <div className={SignUpCSS.signUpBoxBottomLayer}>
                {
                  signUpSubmitButton(signUpPageState)
                }
              </div>  
              
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
