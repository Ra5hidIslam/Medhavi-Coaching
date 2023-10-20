
import React from 'react';
import { useState } from 'react';
// import './App.css';
import NavBar from './components/Navbar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home"
import JEE from './pages/JEE/Jee2';
import NEET from './pages/NEET/Neet';
import Courses from './pages/Courses/Courses';
import ExamsPage from './pages/Exams/ExamsPage';
import QuizList from './pages/Quiz/QuizList';
// import Signin from './pages/Signin/Signin';
import Prac from './pages/Prac/Prac';
import Quiz from './pages/Quiz/Quiz';
import QuizStartPage from './pages/Quiz/QuizStartPage';
import Profile from './pages/Profile/Profile';
import PracInside from './pages/Prac/PracInside';
import Landing from './pages/LandingPage/Landing';
import Blog from './pages/Blog/Blog2.js';
function App() {
	return (
		<Router>
			{/* <Routes>
				{/* <Route path='/' element={<Landing/>} /> */}
			{/* </Routes>  */}
			<NavBar />
			<Routes>
				<Route path='/signin' exact  element={<Landing/>}/>
				{/* <Route path='/' exact  element={<Home/>}/> */}
				<Route path='/' exact  element={<Home/>}/>
				<Route path='/Blog/JEE' element={<JEE/>}/>
				<Route path='/Blog/NEET' element={<NEET/>}/>
				{/* <Route path='/Courses' element={<Courses/>} /> */}
				{/* <Route path='/Exams' element={<ExamsPage/>} /> */}
				{/* <Route path='/QuizList/*' element={<QuizList/>} /> */} 
				{/* <Route exact path='/profile' render ={()=>{window.location.href ="/profile.html"}} /> */}
				{/* <Route path='/Quiz' element={<Quiz/>}/>
				<Route path='/QuizStartPage' element={<QuizStartPage/>}/> */}
				<Route path='/Profile' element={<Profile/>}/>
				{/* <Route path='/PracInside' element={<PracInside/>} /> */}
				<Route path='/Blog' element={<Blog/>}/>
			</Routes>
		</Router>
	
	);
}

export default App;
