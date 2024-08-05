import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { LineChart, useDrawingArea } from "@mui/x-charts";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { styled, Typography } from "@mui/material";
import axios from "axios";


const DashBoard = () => {
  const [pendingOrder,setPendingOrder] =useState(0);
  const[delivred,setDelivred]=useState(0);
  const [CancelOrder,setCancelOrder]=useState(0);
  const[confirm,setConfirm]=useState(0);
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
        setPendingOrder(0); // Set to 0 in case of error
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

 
  const data = [
    { value: pendingOrder, color: "#006266" },
    { value: confirm, color: "#f5cd79" },
    { value: delivred, color: "#8e24aa" },
    { value: CancelOrder, color: "#00bfa5" },
  ];

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    const centerY = top + height / 2;
    return (
      <StyledText x={left + width / 2} y={centerY}>
        {children}
      </StyledText>
    );
  }

  const labels = [
    { color: "#006266", text: `Pending (${pendingOrder})` },
    { color: "#f5cd79", text: `Confirmed (${confirm})` },
    { color: "#8e24aa", text: `Delivered (${delivred})` },
    { color: "#00bfa5", text: `Canceled (${CancelOrder})` },
  ];

  return (
    <div>
      <SideBar />
      <div className="pt-12 md:pl-64 m-2 ">
        <div className="m-2">
          <p className="text-indigo-500 text-xl font-bold">
            Welcome, Software.
          </p>
          <p className="text-gray-600">
            Monitor your business analytics and statistics
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white shadow-lg rounded-lg p-3 mb-4">
            <p className="font-bold py-3">
              <img
                src="./analytics.png"
                alt="/analytics.png"
                className="w-6 h-6 inline-block mr-2"
              />
              Business Analytics
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-4">
              <div className="bg-white shadow-md rounded-lg p-3 border border-indigo-500">
                <div className="flex justify-between">
                  <p className="font-semibold">Pending</p>
                  <img
                    src="./circular-clock (1).png"
                    alt="/circular-clock (1).png"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-2xl font-bold">{pendingOrder}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-3 border border-indigo-500">
                <div className="flex justify-between">
                  <p className="font-semibold">Confirmed</p>
                  <img
                    src="./checked (1).png"
                    alt="/circular-clock (1).png"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-2xl font-bold">{confirm}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-3 border border-indigo-500">
                <div className="flex justify-between">
                  <p className="font-semibold">Canceled</p>
                  <img
                    src="./cancel (1).png"
                    alt="/circular-clock (1).png"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-2xl font-bold">{CancelOrder}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-3 border border-indigo-500">
                <div className="flex justify-between">
                  <p className="font-semibold">Delivered</p>
                  <img
                    src="./package.png"
                    alt="./package.png"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-2xl font-bold">{delivred}</p>
              </div>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <div className="flex justify-between">
                  <p className="font-bold flex items-center">
                    <img src="./growth.png" alt="Growth" width="20px" />
                    <p className="px-3">Order Statistics</p>
                  </p>
                  <div className="flex gap-3 border rounded-lg border-indigo-500 p-1 text-xs text-indigo-500">
                    <p className="bg-indigo-500 text-white rounded p-1">
                      This Month
                    </p>
                    <p className="p-1">This Year</p>
                    <p className="p-1">This Week</p>
                  </div>
                </div>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                  height={300}
                  margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <p className="font-bold py-3 text-center">
                  Order Status Statistics
                </p>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={data}
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <PieCenterLabel>Order</PieCenterLabel>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center mt-2">
                  {labels.map((label, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <div
                        className="mx-2 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: label.color }}
                      />
                      <Typography>{label.text}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <div className="flex justify-between">
                  <p className="font-bold flex items-center">
                    <img src="./growth.png" alt="Growth" width="20px" />
                    <p className="px-3">Earning Statistics</p>
                  </p>
                  <div className="flex gap-3 border rounded-lg border-indigo-500 p-1 text-xs text-indigo-500">
                    <p className="bg-indigo-500 text-white rounded p-1">
                      This Month
                    </p>
                    <p className="p-1">This Year</p>
                    <p className="p-1">This Week</p>
                  </div>
                </div>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                  height={300}
                  margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <div className="flex justify-between">
                  <p className="font-bold">Recent Orders</p>
                  <a href="/">
                    <p className="text-indigo-500">View All</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <div className="flex justify-between">
                  <p className="font-bold">Top Selling Products</p>
                  <a href="/">
                    <p className="text-indigo-500">View All</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <div className="flex justify-between">
                  <p className="font-bold">Most Rated Products</p>
                  <a href="/">
                    <p className="text-indigo-500">View All</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="card p-4 mb-8 shadow-lg rounded-lg bg-transparent">
                <div className="flex justify-between">
                  <p className="font-bold">Top Customer</p>
                  <a href="/">
                    <p className="text-indigo-500">View All</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
