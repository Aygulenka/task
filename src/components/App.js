
import './App.css';
import {Routes, Route} from 'react-router-dom';
import TablePage from '../Page/TablePage';
import HomePage from '../Page/HomePage';
import Login from './Login';
import Header from './Header';

function App() {
  return (
    <>
    <Header/>
<Routes>

  <Route path='/' element={<HomePage/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/table' element={<TablePage/>}/>
</Routes>
</>
  );
}

export default App;
