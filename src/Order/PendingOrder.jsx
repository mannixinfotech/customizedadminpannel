import React, { useEffect, useState }  from 'react'
import SideBar from '../Componets/SideBar'


import DataTable from 'react-data-table-component';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import DownloadIcon from "@mui/icons-material/Download";

import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from 'react-router-dom';


const PendingOrder = () => {
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
      .get("https://customizedapi.onrender.com/order/pendingStatusOrder")
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
        name: "Customer Info",
        selector: (row) => row.fullname,
        sortable: false,
        minWidth:"140px"
      },
  
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: false,
        minWidth:"200px"
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
        name:"Payment Status",
        selector:(row)=>row.paymentStatus,
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
           Pending Order
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

export default PendingOrder