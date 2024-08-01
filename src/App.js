
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './Componets/SideBar';
import DashBoard from './Componets/DashBoard';
import Category from './CategorySetup/Category';
import ProductAdd from './ProductSetup/ProductAdd';
import ProductList from './ProductSetup/ProductList';
import User from './Pages/User';
import Authentication from './Componets/Authentication';
import ProtectedRoute from './Componets/ProtectedRoute';
import AllOrder from './Order/AllOrder';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authentication/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard><SideBar/></DashBoard></ProtectedRoute>} />
      <Route path='/category' element={<ProtectedRoute><Category/></ProtectedRoute>}/>
      <Route path='/product-add' element={<ProtectedRoute><ProductAdd/></ProtectedRoute>}/>
      <Route path='/product-list' element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
      <Route path="/product-edit" element={<ProtectedRoute><ProductAdd /></ProtectedRoute>} />
      <Route path='/user' element={<ProtectedRoute><User/></ProtectedRoute>}/>
      <Route path='/all-order' element={<ProtectedRoute><AllOrder/></ProtectedRoute>}/>
     
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
