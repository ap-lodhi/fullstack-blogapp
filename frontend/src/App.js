
import Signup from './Componets/signup';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Componets/Login';
import AddBlog from "./Componets/AddBlog"
import Blog from './Componets/Blog';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/addBlog' element={<AddBlog/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>

       </Routes>
    </div>
  );
}

export default App;
