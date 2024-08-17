import React, { useEffect, useState }  from 'react'
import SideBar from '../Componets/SideBar'


import DataTable from 'react-data-table-component';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import DownloadIcon from "@mui/icons-material/Download";

import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from 'react-router-dom';


const ConfirmOrder = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const [searchQuery, setSearchQuery] = useState("");
  
const navigate = useNavigate();
 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("https://customizedapi.onrender.com/order/ConfirmedStatusOrder")
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

 

 
  
  const handleDownload = (url) => {
    // Fetch the image data
    axios.get(url, { responseType: 'blob' })
      .then((response) => {
        // Create a blob URL
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = url.split('/').pop(); // Set the filename from the URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("There was an error downloading the image!", error);
      });
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
  const handleViewClick = (id) => {
    navigate(`/order-details/${id}`);
  };
  const handleBillPrint =(id) =>
    {
      navigate(`/print-bill/${id}`);
    }
  
  
  const columns = [
    {
      name: "SL",
      selector:(row)=>row._id,
      sortable: false,
    },
    {
      name: "logo",
      selector: (row) => row.photo,
      cell: (row) => (
        <div className='flex items-center justify-center'>
          {row.photo ? (
            <img
              src={row.photo}
              alt="Order"
              onClick={() => handleDownload(row.photo)} 
              className='w-14 h-14 pt-2 pb-2'
              onError={(e) => e.target.src = "./default-image.png"} // Fallback image if photo fails to load
            />
          ) : (
            <span className='text-gray-500'>{row.logoName}</span> // Show logoName if photo is not available
          )}
        </div>
      ),
    },
    {
      name: "Code",
      selector: (row) => row.subCategoryName,
      sortable: false,
    },

    {
      name: "Customer Info",
      selector: (row) => row.email,
      sortable: false,
      minWidth:"200px"
    },
    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      sortable: false,
      minWidth:"140px"
    },
    
    {
      name: "Amount",
      selector: (row) => row.totalPrice,
      sortable: false,
    },
    {
      name:"Order Date",
      selector:(row)=>row.OrderDate,
      minWidth:"110px"
    },
   
    
    { 
      name: "Order Status", 
      selector: (row) => row.orderStatus,
      sortable: false,
      minWidth:"130px",
      cell: (row) => (
        <span className={`status-${row.orderStatus.toLowerCase()}`}>
          {row.orderStatus}
        </span>
      )
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
         <button
          onClick={() => handleViewClick(row._id)}
          className="text-red-600 hover:text-red-600"
        >
             <VisibilityIcon className="text-xl border  border-black" />
          </button>
          <button
            onClick={()=>handleBillPrint(row._id)}
            className="text-black"
          >
              <PrintIcon className="text-xl border border-red-500" />
          </button>
        </div>
      ),
    },
    
  ];
  return (
    <div>
    <SideBar/>
    <div className='md:pl-64 pt-14 m-2'>
    <div className="flex items-center pt-3 pl-6">
         <img src='../allorder.png' alt='/' className='h-6 w-6'/>
          <p className="font-bold text-lg px-2">
          Confirmed Order
          </p>
        </div>
      
       
        <div className="p-5">
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md">
         
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
                  className="bg-red-600 text-white p-2 px-4 rounded-r-md"
                >
                  Search
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="border border-red-600 text-red-600 p-2 px-4 rounded hover:bg-red-600 hover:text-white">
                  <DownloadIcon/> Export
                </button>
               
              </div>
            </div>
            <DataTable
            className=''
              columns={columns}
              data={filteredProducts}
              progressPending={loading}
              pagination
              paginationPerPage={10}
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
        
       
      </div>
    </div>
    
    
  )
}

export default ConfirmOrder