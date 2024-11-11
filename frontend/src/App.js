import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post('/users', { name: userName });
      setUsers([...users, response.data]);
      setUserName('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await axios.post('/products', {
        name: productName,
        price: productPrice,
      });
      setProducts([...products, response.data]);
      setProductName('');
      setProductPrice('');
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteAllUsers = async () => {
    try {
      await axios.delete('/users');
      setUsers([]);
    } catch (error) {
      console.error('Error deleting all users:', error);
    }
  };

  const deleteAllProducts = async () => {
    try {
      await axios.delete('/products');
      setProducts([]);
    } catch (error) {
      console.error('Error deleting all products:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">User Management</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addUser}>
          Add User
        </button>
      </div>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name}
          </li>
        ))}
      </ul>
      <button className="btn btn-danger mt-3" onClick={deleteAllUsers}>
        Delete All Users
      </button>

      <h1 className="text-center my-4">Product Management</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addProduct}>
          Add Product
        </button>
      </div>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <button className="btn btn-danger mt-3" onClick={deleteAllProducts}>
        Delete All Products
      </button>
    </div>
  );
};

export default App;
