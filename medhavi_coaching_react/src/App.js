
import React from 'react';
// import './App.css';
import Navbar from './components/Navbar/navbar_index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import About from './pages/About';
import Courses from './pages/Courses';
import Exams  from './pages/Exams'
import Quiz from './pages/Quiz';
import Signin from './pages/Signin';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route path='/Home' exact  element={<Home/>}/>
		<Route path='/About' element={<About/>} />
		<Route path='/Courses' element={<Courses/>} />
		<Route path='/Exams' element={<Exams/>} />
		<Route path='/Quiz' element={<Quiz/>} />
		{/* <Route exact path='/profile' render ={()=>{window.location.href ="/profile.html"}} /> */}
		<Route path='/Signin' element={<Signin/>} />
	</Routes>
	</Router>
  
);
}

export default App;
