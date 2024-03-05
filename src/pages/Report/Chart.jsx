import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { currenUserDataFn, currentUserFn } from "@/api/Auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ chartData }) => {
  console.log(chartData);

  return (
    <div className="px-6">
      <div className="flex flex-col items-center w-full p-6 pb-6 bg-white rounded-lg shadow-xl sm:p-8 mt-6">
        <h2 className="text-xl font-bold">Your Score by Chart</h2>

        <ResponsiveContainer className="w-full mt-10" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nama_kategori" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar
              dataKey="nilai"
              fill="#06476F"
              // label={{ position: "top", fontSize: 12, fill: "black" }} // Mengatur label di atas bar
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
