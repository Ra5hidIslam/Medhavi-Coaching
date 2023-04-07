
import React from 'react';
// import './App.css';
import NavBar from './components/Navbar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home"
import About from './pages/About/About';
import Courses from './pages/Courses/Courses';
import Exams  from './pages/Exams/Exams'
import QuizList from './pages/Quiz/QuizList';
// import Signin from './pages/Signin/Signin';
import Prac from './pages/Prac/Prac';
import Quiz from './pages/Quiz/Quiz';
import QuizStartPage from './pages/Quiz/QuizStartPage';
import PracInside from './pages/Prac/PracInside';
function App() {
return (
	<Router>
	<NavBar />
	<Routes>
		<Route path='/' exact  element={<Home/>}/>
		<Route path='/Home' exact  element={<Home/>}/>
		<Route path='/About' element={<About/>} />
		<Route path='/Courses' element={<Courses/>} />
		<Route path='/Exams' element={<Exams/>} />
		<Route path='/QuizList/*' element={<QuizList/>} />
		{/* <Route exact path='/profile' render ={()=>{window.location.href ="/profile.html"}} /> */}
		{/* <Route path='/Signin' element={<Signin/>} /> */}
		<Route path='/Prac/*' element={<Prac/>} />
		<Route path='/PracInside/*' element={<PracInside/>} />
        <Route path ="/Quiz/*" element ={<Quiz />}/>
		<Route path = '/QuizStartPage/*' element = {<QuizStartPage/>}/>
	</Routes>
	</Router>
  
);
}

export default App;
