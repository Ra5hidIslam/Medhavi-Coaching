import React from 'react'
import LoginCSS from './Login.module.css'
function Login_form({logState}) {
  return (
          <div className={logState ? LoginCSS.active: LoginCSS.non_active} >
            <form>
              <label>
                  <p>Username</p>
                  <input type = "text"/>
              </label>
              <label>
                  <p>Password</p>
                  <input type = "password"/>
              </label>
              <div>
                  <button type ="submit">Submit</button>
              </div>
          </form>
          </div>
  )
}

export default Login_form