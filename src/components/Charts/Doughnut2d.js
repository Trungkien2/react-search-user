// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the chart configurations

const Doughnut2D = ({data})=>{
  const chartConfigs = {
    type: "Doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption : 'start per language',
        theme : 'candy',
        decimals : 0,
        DoughnutRadius : '45%',
        showPercentValue : 0,
      },
      // Chart Data
      data,
    }
  };
  return <ReactFC {...chartConfigs} />
}


export default Doughnut2D;