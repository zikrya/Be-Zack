import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar'
import AuthContextProvider from './context/AuthContext';
import Feed from './pages/Feed';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home'
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Submit from './pages/Submit';
import UserPage from './pages/UserPage';

function App() {

  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/login" element={<LogIn/>} />
            <Route exact path="/reset-password" element={<ForgotPassword/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/user" element={<UserPage/>}/>
            <Route exact path="/submit" element={<Submit/>}/>
            <Route exact path="/feed" element={<Feed/>}/>
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  )
}

export default App;



