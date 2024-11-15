import { Line } from 'solid-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Component, onMount } from 'solid-js';

const OverViewChart: Component = () => {
  onMount(() => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  });

  const calculateMonths = () => {
    let months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    let today = new Date();
    let currentMonths: String[] = []

    for (let i = 5; i >= 0; i -= 1) {
      let currentDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      currentMonths.push(months[currentDate.getMonth()]);
    }

    return currentMonths;
  }

  const labels = calculateMonths();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        stepSize: 100,
        max: 500,
        ticks: {
          stepSize: 100,
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
    },
  };


  const chartdata = {
    labels,
    datasets: [
      {
        label: 'Expenses - Last 6 Months',
        data: [100, 300, 200, 100, 200, 400],
        borderColor: '#B51021',
        backgroundColor: '#B51021',
        color: '#B51021',
        tension: 0.3,
      },

      {
        label: 'Income - Last 6 Months',
        data: [50, 100, 250, 50, 200, 300],
        borderColor: '#070ab5',
        backgroundColor: '#070ab5',
        color: '#070ab5',
        tension: 0.3,
      },

    ],

  };

  return (
    <section class="w-full h-96 shadow-md p-6 mb-10 rounded-md bg-white">
      <Line options={options} data={chartdata} />
    </section>
  );
}

export default OverViewChart;
