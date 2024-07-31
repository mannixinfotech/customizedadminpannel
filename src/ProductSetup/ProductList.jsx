import React, { useEffect, useState } from "react";
import SideBar from "../Componets/SideBar";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [orders, setOrders] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/product/get")
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  };

  const handleEdit = (row) => {
    navigate("/product-edit", {
      state: { product: row },
    });
  };


  const handleDelete = (row) => {
    setDeleteId(row._id);
    setShowDeleteDialog(true);
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

  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Product Image",
      selector: "photo",
      sortable: false,
      cell: (row) => (
        <img
          src={row.photo}
          alt="Product"
          className="w-14 h-14 mt-2 mb-2 object-cover "
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: false,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: false,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FontAwesomeIcon icon={faEdit} className="text-xl" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-800"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <SideBar />
      <div className="md:pl-64 pt-14 m-2">
        <div className="flex items-center pt-3 pl-6">
          <img
            src="https://minaxipalace.in/app/public/assets/admin/img/icons/product.png"
            alt="/allorder.png"
            className="w-6 h-6 mr-2"
          />
          <p className="font-bold text-lg">
            Product List
          </p>
        </div>
        <div className="p-5">
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <input
                  type="text"
                  className="form-control p-2 border border-gray-300 rounded-l-md"
                  placeholder="Search by id"
                />
                <button className="bg-indigo-500 text-white p-2 px-4 rounded-r-md">
                  Search
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="border border-indigo-500 text-indigo-500 p-2 px-4 rounded hover:bg-indigo-500 hover:text-white">
                  <DownloadIcon /> Export
                </button>
                <button
                  onClick={() => navigate("/product-add")}
                  className="border border-indigo-500 bg-indigo-500 text-white p-2 px-4 rounded hover:bg-indigo-600"
                >
                  <AddIcon /> Add New Product
                </button>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={orders}
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
  );
};

export default ProductList;
