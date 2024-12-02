<template>
    <div>
      <canvas id="bar-chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  export default {
    name: "BarChart",
    props: {
      labels: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      // Register the necessary chart.js components
      Chart.register(...registerables);
      this.createChart(); // Create chart on mount
    },
    watch: {
      // Watch for changes to the props and update the chart
      data(newData) {
        this.updateChart(newData);
      },
      labels(newLabels) {
        this.updateChart(undefined, newLabels);
      },
    },
    methods: {
      // Method to create the chart
      createChart() {
        const ctx = document.getElementById("bar-chart").getContext("2d");
        this.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: [
              {
                data: this.data,
                backgroundColor: "rgba(54, 162, 235)",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "black",
                },
                border: {
                  color: "blue",
                  width: 3,
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "black",
                  stepSize: 1, // Ensure the step is 1
                  callback: (value) => (Number.isInteger(value) ? value : null), // Display only integers
                },
                border: {
                  color: "blue",
                  width: 3,
                },
                beginAtZero: true,
              },
            },
          },
        });
      },
      updateChart(newData, newLabels) {
        if (this.chart) {
          if (newData) {
            this.chart.data.datasets[0].data = newData;
          }
          if (newLabels) {
            this.chart.data.labels = newLabels;
          }
          this.chart.update();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  div {
    width: 80%;
  }
  </style>
  