
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './Componets/SideBar';
import DashBoard from './Componets/DashBoard';
import Category from './CategorySetup/Category';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<DashBoard><SideBar/></DashBoard>} />
      <Route path='/category' element={<Category/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
