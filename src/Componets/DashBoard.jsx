import React from "react";
import SideBar from "./SideBar";
import { LineChart, useDrawingArea } from "@mui/x-charts";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { styled, Typography } from "@mui/material";


const DashBoard = () => {
  const data = [
    { value: 5, color: "#006266" },
    { value: 10, color: "#f5cd79" },
    { value: 15, color: "#8e24aa" },
    { value: 20, color: "#00bfa5" },
    { value: 50, color: "#1e88e5" },
    { value: 40, color: "#c23616" },
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
    { color: "#006266", text: "Pending (0)" },
    { color: "#f5cd79", text: "Ongoing (0)" },
    { color: "#8e24aa", text: "Delivered (0)" },
    { color: "#00bfa5", text: "Canceled (0)" },
    { color: "#1e88e5", text: "Returned (0)" },
    { color: "#c23616", text: "Failed (0)" },
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
                <p className="text-2xl font-bold">0</p>
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
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-3 border border-indigo-500">
                <div className="flex justify-between">
                  <p className="font-semibold">Processing</p>
                  <img
                    src="./package.png"
                    alt="/circular-clock (1).png"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-3 border border-indigo-500">
                <div className="flex justify-between">
                  <p className="font-semibold">Out of Delivery</p>
                  <img
                    src="./delivery-man (3).png"
                    alt="/circular-clock (1).png"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-2xl font-bold">9</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="./box (1).png"
                    alt="/box (1).png"
                    className="w-5 h-5"
                  />
                  <p className="ml-2 font-semibold">Delivered</p>
                  <p className="ml-auto text-green-500 font-bold">1</p>
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
                  <p className="ml-auto text-green-500 font-bold">1</p>
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
                  <p className="ml-auto text-green-500 font-bold">1</p>
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
                  <p className="ml-auto text-green-500 font-bold">1</p>
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
