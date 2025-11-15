import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Register from './features/auth/Register'
import Login from './features/auth/Login'
import ProductList from './features/product/ProductList';
import GetProductById from './features/product/GetProductById';
import AddProduct from './features/product/AddProduct';
import UpdateProduct from './features/product/UpdateProduct';
import UserBasket from './features/basket/UserBasket';
import EmptyBasket from './features/basket/EmptyBasket';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/productList' element={<ProductList />} />
          <Route path='/getProductById/:id' element={<GetProductById />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/updateProduct/:id' element={<UpdateProduct />} />
          <Route path='/userBasket' element={<UserBasket />} />
          <Route path="/empty-basket" element={<EmptyBasket />} />
          <Route path="/search" element={<Search/>} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
