import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../Componets/SideBar';

const ProductAdd = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    category: '',
    photo: null,
    photoPreview: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/category/get')
      .then(response => setCategories(response.data.data))
      .catch(error => console.error(error));

    if (state && state.product) {
      const product = state.product;
      setFormData({
        productName: product.productName,
        price: product.price,
        description: product.description,
        category: product.category,
        photo: null,
        photoPreview: product.photo || '',
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleImageClick = () => {
    document.getElementById('photoInput').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('photo', formData.photo);

    setLoading(true);

    const request = state && state.product ? 
      axios.put(`http://localhost:5000/product/update/${state.product._id}`, data) :
      axios.post('http://localhost:5000/product/add', data);

    request.then((response) => {
      setLoading(false);
      if (response.status === 200) {
        toast.success(`Product ${state && state.product ? 'updated' : 'added'} successfully!`);
        navigate('/product-list');
      }
    }).catch((error) => {
      console.error(error);
      setLoading(false);
      toast.error('Something went wrong!');
    });
  };

  const handleReset = () => {
    setFormData({
      productName: '',
      price: '',
      description: '',
      category: '',
      photo: null,
      photoPreview: null,
    });
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <SideBar/>
      <div className="md:pl-64 pt-14 m-2">
        <div className="flex items-center pt-3 pl-6">
          <img
            src="https://minaxipalace.in/app/public/assets/admin/img/icons/product.png"
            alt="/allorder.png"
            className="w-6 h-6 mr-2"
          />
          <p className="font-bold text-lg">{state && state.product ? 'Edit Product' : 'Add Product'}</p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-5">
          <div className="bg-white border border-gray-200 p-3 mb-4 rounded-lg shadow md:col-span-1">
            <div>
              <p className="border-b p-4 text-orange-700 text-left">English(EN)</p>
              <div className="pt-3">
                <p className="text-left font-semibold">
                  Category
                  <span className="text-orange-700">*</span>
                </p>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus: block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500"
                  required
                >
                  <option value="">---Select Branch---</option>
                  {categories.map(category => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="productName"
                className="pt-5 block mb-2 text-base font-medium text-gray-900 dark:text-white text-left"
              >
               Name (EN)
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="New Product"
                required
              />
              <label
                htmlFor="price"
                className="pt-5 block mb-2 text-base font-medium text-gray-900  text-left"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Price"
                required
              />
              <label
                htmlFor="description"
                className="pt-5 block mb-2 text-base font-medium text-gray-900 dark:text-white text-left"
              >
                Short Description (EN)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                required
              ></textarea>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-9 mb-4 rounded-lg shadow md:col-span-1">
            <p className="text-left font-semibold">
              Product Image <span className="text-orange-700">* ( Ratio 1:1 )</span>
            </p>
            <input
              type="file"
              id="photoInput"
              name="photo"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="pt-24 flex justify-center">
              {formData.photoPreview ? (
                <img
                  src={formData.photoPreview}
                  alt="Upload"
                  className="cursor-pointer"
                  onClick={handleImageClick}
                  width="176"
                />
              ) : (
                <img
                  src="https://minaxipalace.in/app/public/assets/admin/img/icons/upload_img.png"
                  alt="Upload"
                  className="cursor-pointer"
                  onClick={handleImageClick}
                  width="176"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center md:justify-end gap-3 mt-4 col-span-1 md:col-span-2">
            <button type="reset" className="btn btn-secondary bg-gray-400 text-white py-2 px-4 rounded-md" onClick={handleReset}>Reset</button>
            <button type="submit" className="btn btn-primary bg-indigo-500 text-white py-2 px-4 rounded-md">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProductAdd;
