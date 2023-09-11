import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';




ReactDOM.render(
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>,
  document.getElementById('root')
);


// ReactDOM.render(
//     <App/>,
//   document.getElementById('root')
// );



// server {
//   listen 80;
// #       listen [::]:80 ipv6only = on
//   root /Medhavi-Coaching/medhavi_coaching_react/build;
//   index index.html;
//   location /{
//   try_files $uri/index.html;
//   }
// }




