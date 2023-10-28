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
  password:"",
  image:""
});



// const initialFormData = new FormData;

const SignUp = ({ logState,handleLoginClick}) => {
  console.log(logState);

  const [formData,updateFormData] = useState(initialFormData);
  const [signUpPageState, setSignUpPageState] = useState(1);

  const handleImage = (e)=>{
    if(e.target.files[0].size > 1000000){
      alert("Please select a photo which is smaller than 1MB");
      return 
    }
    updateFormData({
      ...formData,
      [e.target.name]:e.target.files[0],
    })
    // formData.append(e.target.name,e.target.files[0])
  }

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
    // formData.append(e.target.name,targetValue);
    console.log(formData);
  };

  const handleSubmit = async()=>{
    console.log(formData);
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
        // convert the data into form data;
        // formdata.append("name", formData.name);
        // formdata.append("email", formData.email);
        // formdata.append("password", formData.password);
        // formdata.append("userId", formData.userId);
        // formdata.append("image", formData.image);
        // console.log(formdata);    
        const SignUpState = await getSignUp(formData);
        // add one more api call to upload the image for the user
        if(SignUpState == "errorCode1"){
          // username already taken
          console.log("Duplicate User");
        }
        else{
          // alert("error in Signing you, Sorry");
          if(SignUpState == true){
            console.log("Account created successfully");
            handleSuccessLogin();

          }
          
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
            <form>
              <label>Name</label>
              <input type="text" name="name" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
              <label>Email</label>
              <input type="text" name="email" className={SignUpCSS.SignUpBox} onChange={handleChange}/> 
              <label>Username</label>
              <input type="text" name="userId" className={SignUpCSS.SignUpBox} onChange={handleChange}/>
              <label>Password</label>
              <input type="password" name="password" className={SignUpCSS.SignUpBoxPass} onChange={handleChange}/> 
              <label>Profile Picture</label>
              <input type="file" name="image" className={SignUpCSS.SignUpBox} onChange={handleImage}/> 
            </form>
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
          <div className={SignUpCSS.successMessage}> 
            <div className={SignUpCSS.successMessage}> You account has been created</div>
            <div className={SignUpCSS.successMessage}> Please login using your credentials</div>
          </div>
        )
      }
  }

  const signUpSubmitButton = (signUpPageState)=>{
    if(signUpPageState == 1){
      return (
        // <div  className={SignUpCSS.SignUpBtn} onClick={handleNext}>Next</div>
        <div className={SignUpCSS.SignUpBtn} onClick={handleSubmit}>Submit</div>
      )
    }
    // else if(signUpPageState ==2){
    //   return (
    //     // <div className={SignUpCSS.SignUpBtn} onClick={handleSubmit}>Submit</div>
    //   )
    // }
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
                  // <div className={SignUpCSS.SignUpBtn} onClick={handleSubmit}>Submit</div>
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