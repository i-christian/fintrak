import { Line } from "solid-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Component, createSignal, onMount } from "solid-js";
import { getInsights } from "../hooks/useFetch";

interface Insight {
  transaction_type: "expense" | "income";
  month: string;
  total: number;
}

const OverViewChart: Component = () => {
  const [chartData, setChartData] = createSignal({
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
    }[],
  });

  const getLastSixMonths = (): string[] => {
    const months: string[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(date.toLocaleString("default", { month: "long" }));
    }

    return months;
  };

  onMount(async () => {
    try {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
      );

      const insights: Insight[] = await getInsights();
      const lastSixMonths = getLastSixMonths();

      const expenseData = lastSixMonths.map(
        (month) =>
          insights
            .filter((i) => i.transaction_type === "expense")
            .find(
              (i) =>
                new Date(i.month).toLocaleString("default", {
                  month: "long",
                }) === month,
            )?.total || 0,
      );

      const incomeData = lastSixMonths.map(
        (month) =>
          insights
            .filter((i) => i.transaction_type === "income")
            .find(
              (i) =>
                new Date(i.month).toLocaleString("default", {
                  month: "long",
                }) === month,
            )?.total || 0,
      );

      setChartData({
        labels: lastSixMonths,
        datasets: [
          {
            label: "Expenses",
            data: expenseData,
            borderColor: "#B51021",
            backgroundColor: "#B51021",
            tension: 0.3,
          },
          {
            label: "Income",
            data: incomeData,
            borderColor: "#070ab5",
            backgroundColor: "#070ab5",
            tension: 0.3,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
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

  return (
    <section class="w-full h-96 shadow-md p-6 mb-10 rounded-md bg-white">
      <Line options={options} data={chartData()} />
    </section>
  );
};

export default OverViewChart;
