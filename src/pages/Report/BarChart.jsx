import React, { useRef, useEffect } from "react";
import Chart from 'chart.js/auto'; // Impor Chart.js
import 'chartjs-adapter-date-fns'; 
import 'chartjs-adapter-moment'; 

const BarChart = ({ chartData }) => {
  const chartRef = useRef(null);
  let myChart; // Variabel untuk menyimpan objek grafik

  useEffect(() => {
    if (chartRef && chartRef.current) {
    
      myChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: chartData?.map((data) => data.nama_kategori),
          datasets: [{
            label: "Score",
            data: chartData?.map((data) => data.nilai),
            backgroundColor: 'rgba(6, 71, 111, 0.5)', //mengatur Warna sedikit transparan
            borderColor: 'rgba(6, 71, 111, 0.7)', //mengatur Border yang lebih tua
            borderWidth: 2 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 10
            }
          }
        }
      });

      // Menghancurkan grafik sebelumnya saat komponen dilepas dari DOM
      return () => myChart.destroy();
    }
  }, [chartData]);

  return (
    <div className="px-6">
      <div className="flex flex-col items-center w-full p-6 pb-6 bg-white rounded-lg shadow-xl sm:p-8 mt-6">
        <h2 className="text-xl font-bold">Your Score by Chart</h2>
        <canvas ref={chartRef}></canvas> {/* Gunakan <canvas> untuk membuat kanvas */}
      </div>
    </div>
  );
};

export default BarChart;
