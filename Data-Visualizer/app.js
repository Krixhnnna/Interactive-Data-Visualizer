document.addEventListener('DOMContentLoaded', function() {
    // Create a style tag and append it to the document head
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        background-color: #fafafa;
        color: #333;
        line-height: 1.6;
      }
      header {
        background-color: #f0f0f0;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      header h1 {
        font-size: 2rem;
        color: #555;
      }
      main {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #upload-section {
        margin-bottom: 30px;
        text-align: center;
      }
      #upload-section input,
      #upload-section button {
        padding: 10px;
        font-size: 1rem;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
      }
      #upload-section input[type="file"] {
        width: 200px;
      }
      button {
        cursor: pointer;
        background-color: #f0f0f0;
      }
      button:hover {
        background-color: #e0e0e0;
      }
      #chart-container {
        width: 100%;
        max-width: 800px;
        height: 400px;
        margin-top: 20px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        position: relative;
      }
      #chart {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        height: 100%;
        width: 100%;
      }
      .bar {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        width: 40px;
        background-color: #ddd;
        margin: 0 10px; /* Increase space between bars */
      }
      .bar span {
        margin-top: 5px;
        font-size: 12px;
      }
      .bar-1 { background-color: #e57373; }
      .bar-2 { background-color: #81c784; }
      .bar-3 { background-color: #64b5f6; }
      .bar-4 { background-color: #ffb74d; }
      .bar-5 { background-color: #ba68c8; }
      .bar-6 { background-color: #ffd54f; }
      .bar-7 { background-color: #4db6ac; }
      .axis-label {
        position: absolute;
        bottom: -20px;
        text-align: center;
        font-size: 12px;
      }
      .y-axis-labels {
        position: absolute;
        left: -40px;
        top: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 12px;
        color: #555;
      }
      .y-axis-labels div {
        display: block;
      }
      .x-axis-labels {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: -30px;
        width: 100%;
      }
      .x-axis-labels span {
        font-size: 12px;
        width: 100%;
        text-align: center;
        margin: 0 10px; /* Added margin to separate labels */
      }
    `;
    document.head.appendChild(style);
  
    document.getElementById('renderChart').addEventListener('click', renderChart);
  
    function renderChart() {
      const fileInput = document.getElementById('csvFile');
      const file = fileInput.files[0];
  
      if (!file) {
        alert('Please upload a CSV file!');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;
        const data = parseCSV(content);
        displayChart(data);
      };
      reader.readAsText(file);
    }
  
    function parseCSV(content) {
      const lines = content.trim().split('\n');
      const headers = lines[0].split(',');
      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        return {
          category: values[0],
          value: parseFloat(values[1])
        };
      });
      return data;
    }
  
    function displayChart(data) {
      const chartContainer = document.getElementById('chart');
      const xAxisLabels = document.createElement('div');
      xAxisLabels.classList.add('x-axis-labels');
      chartContainer.innerHTML = '';
      
      const yAxisLabels = document.createElement('div');
      yAxisLabels.classList.add('y-axis-labels');
      chartContainer.parentElement.appendChild(yAxisLabels);
  
      const maxValue = Math.max(...data.map(item => item.value));
      const barWidth = 100 / data.length;
  
      for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i].value / maxValue) * 100;
        const bar = document.createElement('div');
        bar.classList.add('bar', `bar-${(i % 7) + 1}`);
        bar.style.height = `${barHeight}%`;
        bar.style.width = `${barWidth}%`;
  
        const label = document.createElement('span');
        label.textContent = data[i].category;
        bar.appendChild(label);
  
        chartContainer.appendChild(bar);
  
        const xLabel = document.createElement('span');
        xLabel.textContent = data[i].category;
        xAxisLabels.appendChild(xLabel);
      }
  
      chartContainer.parentElement.appendChild(xAxisLabels);
  
      const yStep = maxValue / 5;
      for (let i = 0; i <= 5; i++) {
        const yLabel = document.createElement('div');
        yLabel.textContent = Math.round(i * yStep);
        yAxisLabels.appendChild(yLabel);
      }
    }
  });
  