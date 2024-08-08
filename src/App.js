
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
import OrderDetails from './Order/OrderDetails';
import PendingOrder from './Order/PendingOrder';
import ConfirmOrder from './Order/ConfirmOrder';
import CancelOrder from './Order/CancelOrder';
import DelivredOrder from './Order/DelivredOrder';
import SubCategory from './CategorySetup/SubCategory';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authentication/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard><SideBar/></DashBoard></ProtectedRoute>} />
      <Route path='/category' element={<ProtectedRoute><Category/></ProtectedRoute>}/>
      <Route path='/sub-category' element={<ProtectedRoute><SubCategory/></ProtectedRoute>}/>
      <Route path='/product-add' element={<ProtectedRoute><ProductAdd/></ProtectedRoute>}/>
      <Route path='/product-list' element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
      <Route path="/product-edit" element={<ProtectedRoute><ProductAdd /></ProtectedRoute>} />
      <Route path='/user' element={<ProtectedRoute><User/></ProtectedRoute>}/>
      <Route path='/all-order' element={<ProtectedRoute><AllOrder/></ProtectedRoute>}/>
     
      <Route path='/order-details' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
      <Route path='/order-details/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
      <Route path='/order/pending-order' element={<ProtectedRoute><PendingOrder/></ProtectedRoute>}/>
      <Route path='/order/confirmed-order' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
      <Route path='/order/cancel-order' element={<ProtectedRoute><CancelOrder/></ProtectedRoute>}/>
      <Route path='/order/deliver-order' element={<ProtectedRoute><DelivredOrder/></ProtectedRoute>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
