import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import About from './components/About'
import Profile from './components/Profile'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home/>}></Route>
        <Route path = '/' element = {<SignIn/>}></Route>
        <Route path = '/' element = {<SignUp/>}></Route>
        <Route path = '/' element = {<About/>}></Route>
        <Route path = '/' element = {<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
