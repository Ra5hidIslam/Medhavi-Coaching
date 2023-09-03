import React, { useEffect } from "react";
import SignUpCSS from '../SignUp/SignUp.module.css'
import closeLogo from '../../files/icons/close.png';
import { useState } from "react";
import { getSignUp } from "../../components/client/getSignUp";
import { formToJSON } from "axios";



const initialFormData = Object.freeze({
  name:"",
  email:"",
  userId:"",
  password:""
});

const SignUp = ({ logState,handleLoginClick}) => {
  console.log(logState);

  const [formData,updateFormData] = useState(initialFormData);
  const [signUpPageState, setSignUpPageState] = useState(1);

  const handleChange =(e)=>{
    let targetValue;
    if(e.target.name !="name"){
      targetValue = e.target.value.trim();
    }
    targetValue = e.target.value;
    
    updateFormData({
      ...formData,
      //Trimming any whitespace
     
      [e.target.name]:targetValue,
      
    });
    console.log(formData);
  };

  const handleSubmit = async()=>{

    if(formData.name == ""){
      console.log("Please enter name")
      return;
    }else if(formData.email == ""){
      console.log("Please enter email")
      return;
    }else if(formData.userId == ""){
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
          if(SignUpState == true){
            handleSuccessLogin();
          }
          console.log("Account created successfully");
          // console.log(SignUpState);
        }
      }
      catch(err){
        alert(err.message);
      }
      
    }
   
  }


  const handleNext =()=>{
    if(formData.name && formData.email) setSignUpPageState(2);
  }
  const handleSuccessLogin = ()=>{
    setSignUpPageState(4);
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
            <label>Name</label>
            <input type="text" name="name" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
            <label>email</label>
            <input type="text" name="email" className={SignUpCSS.SignUpBox} onChange={handleChange}/> 
          </div>
          
        )
        
      }
      else if(signUpPageState == 2){
        return(
          <div>
            <label>Username</label>
            <input type="text" name="userId" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
            <label>password</label>
            <input type="password" name="password" className={SignUpCSS.SignUpBox} onChange={handleChange}/> 
          </div>
        )
      }
      else if(signUpPageState == 4){
        return(
          <div>
            <div className={SignUpCSS.successMessage}> You account has been created</div>
            <div className={SignUpCSS.successMessage}> Please login using your credentials</div>
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
      {/* <div className={SignUpCSS.SignUpForm}> */}
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
      {/* </div> */}
    </div>
  );
};

export default SignUp;
