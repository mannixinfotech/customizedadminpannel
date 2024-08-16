import React, { useEffect, useState }  from 'react'
import SideBar from '../Componets/SideBar'


import DataTable from 'react-data-table-component';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import DownloadIcon from "@mui/icons-material/Download";

import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from 'react-router-dom';


const AllOrder = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
 
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingOrder,setPendingOrder] =useState(0);
  const[delivred,setDelivred]=useState(0);
  const [CancelOrder,setCancelOrder]=useState(0);
  const[confirm,setConfirm]=useState(0);
 
const navigate = useNavigate();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchPendingOrder = () => {
    axios.get("http://localhost:5000/order/pendingStatusOrder")
      .then((response) => {
        if (response.data && response.data.data) {
          setPendingOrder(response.data.data.length);
        } else {
          setPendingOrder(0); // Set to 0 if data is not in expected format
        }
      })
      .catch((error) => {
        console.error("There was an error fetching pending orders!", error);
        setPendingOrder(0); // Set to 0 in case of error
      });
  };
  useEffect(() => {
    fetchPendingOrder();
  }, []);
 
  const fetchDeliviredOrder = () => {
    axios.get("http://localhost:5000/order/DeliveredStatusOrder")
      .then((response) => {
        if (response.data && response.data.data) {
          setDelivred(response.data.data.length);
        } else {
          setDelivred(0); // Set to 0 if data is not in expected format
        }
      })
      .catch((error) => {
        console.error("There was an error fetching pending orders!", error);
        setDelivred(0); // Set to 0 in case of error
      });
  };
  useEffect(() => {
    fetchDeliviredOrder();
  }, []);
  const fetchConfirmOrder = () => {
    axios.get("http://localhost:5000/order/ConfirmedStatusOrder")
      .then((response) => {
        if (response.data && response.data.data) {
          setConfirm(response.data.data.length);
        } else {
          setConfirm(0); // Set to 0 if data is not in expected format
        }
      })
      .catch((error) => {
        console.error("There was an error fetching pending orders!", error);
        setConfirm(0); // Set to 0 in case of error
      });
  };
  useEffect(() => {
    fetchConfirmOrder();
  }, []);
  

  const fetchCancelOrder = () => {
    axios.get("http://localhost:5000/order/CanceledStatusOrder")
      .then((response) => {
        if (response.data && response.data.data) {
          setCancelOrder(response.data.data.length);
        } else {
          setCancelOrder(0); // Set to 0 if data is not in expected format
        }
      })
      .catch((error) => {
        console.error("There was an error fetching pending orders!", error);
        setCancelOrder(0); // Set to 0 in case of error
      });
  };
  useEffect(() => {
    fetchCancelOrder();
  }, []);

 
  
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
              className='w-14 h-14 pt-2 pb-2'
              onClick={() => handleDownload(row.photo)} 
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
    },
    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      sortable: false,
    },
    
    {
      name: "Amount",
      selector: (row) => row.totalPrice,
      sortable: false,
    },
    {
      name:"Order Date",
      selector:(row)=>row.OrderDate,
    },
   
    
    { 
      name: "Order Status", 
      selector: (row) => row.orderStatus,
      sortable: false,
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
          className="text-indigo-600 hover:text-indigo-800"
        >
             <VisibilityIcon className="text-xl border-2  border-indigo-500" />
          </button>
          <button
           
            className="text-red-600 hover:text-red-800"
          >
              <PrintIcon className="text-xl border-2 border-red-600" />
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
           All Order
          </p>
        </div>
      
       
        <div className="p-5">
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md">
          <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-4 mt-4 m-4">
         
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./circular-clock (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Pending</p>
                  <p className="ml-auto text-indigo-500 font-bold">{pendingOrder}</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./checked (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Confirmed</p>
                  <p className="ml-auto text-indigo-500 font-bold">{confirm}</p>
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
                  <p className="ml-auto text-indigo-500 font-bold">{CancelOrder}</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./package.png"
                    alt="/package.png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Delivered</p>
                  <p className="ml-auto text-indigo-500 font-bold">{delivred}</p>
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

export default AllOrder