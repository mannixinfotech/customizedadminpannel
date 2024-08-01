import React, { useEffect, useState }  from 'react'
import SideBar from '../Componets/SideBar'
import { toast, ToastContainer } from 'react-toastify'

import DataTable from 'react-data-table-component';

import axios from 'axios';
import DownloadIcon from "@mui/icons-material/Download";


const AllOrder = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/order/get")
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  };

 

 
  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/product/delete/${deleteId}`)
      .then((response) => {
        if (response.status === 200) {
          fetchProducts();
          setShowDeleteDialog(false);
          toast.success("Product deleted successfully!");
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
        setShowDeleteDialog(false);
      });
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) =>
        product.email.toLowerCase().includes(query)
      )
    );
  };

  const columns = [
    {
      name: "SL",
      selector:(row)=>row._id,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus,
      sortable: false,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: false,
    },
   
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: false,
    },
    
  ];
  return (
    <div>
    <SideBar/>
    <div className='md:pl-64 pt-14 m-2'>
    <div className="flex items-center pt-3 pl-6">
         <img src='../allorder.png' alt='/' className='h-6 w-6'/>
          <p className="font-bold text-lg px-2">
           All Order
          </p>
        </div>
      
       
        <div className="p-5">
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md">
          <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-4 mt-4 m-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./box (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Pending</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./box (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Confirmed</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./box (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Processing</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./box (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Out of Delivery</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./box (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">
                  Delivered</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./cancel (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Canceled</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./return-box.png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Returned</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./cancel.png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Failed To Delivered</p>
                  <p className="ml-auto text-indigo-500 font-bold">1</p>
                </div>
              </div>
        </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 p-5">
              <div className="flex items-center mb-4 md:mb-0">
                <input
                  type="text"
                  className="form-control p-2 border border-gray-300 rounded-l-md"
                  placeholder="Search by email"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button
                  onClick={() => setFilteredProducts(products.filter((product) => product.email.toLowerCase().includes(searchQuery)))}
                  className="bg-indigo-500 text-white p-2 px-4 rounded-r-md"
                >
                  Search
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="border border-indigo-500 text-indigo-500 p-2 px-4 rounded hover:bg-indigo-500 hover:text-white">
                  <DownloadIcon/> Export
                </button>
               
              </div>
            </div>
            <DataTable
            className='p-5'
              columns={columns}
              data={filteredProducts}
              progressPending={loading}
              pagination
              paginationPerPage={5}
              highlightOnHover
              customStyles={{
                headRow: {
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold",
                  },
                },
              }}
            />
          </div>
        </div>
        {showDeleteDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 p-6 rounded shadow-lg">
              <p>Are you sure you want to delete this product?</p>
              <div className="mt-4 flex space-x-4 justify-center">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
    
    
  )
}

export default AllOrder