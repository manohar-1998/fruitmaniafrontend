import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PieChart = () => {

    const chart = am4core.create("chartdiv", am4charts.PieChart);
  
    // Add data
    chart.data = [
      {
        fruit: "Apple",
        Kilo: 22,
        color: am4core.color("#E41B17"),
      },
      {
        fruit: "Mango",
        Kilo: 40,
        color: am4core.color("#f9fc00"),
      },
      {
        fruit: "Water Melon",
        Kilo: 24,
        color: am4core.color("#e2886b"),
      },
      {
        fruit: "Musk Melon",
        Kilo: 19,
        color: am4core.color("#B2C248"),
      },
      {
        fruit: "Green Grapes",
        Kilo: 26,
        color: am4core.color("#12fe08"),
      },
      {
        fruit: "Papaya",
        Kilo: 19,
        color: am4core.color("#fcc300"),
      },
    ];

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Kilo";
    pieSeries.dataFields.category = "fruit";
    pieSeries.slices.template.propertyFields.fill = "color";
    chart.legend = new am4charts.Legend();

    return(
        <div>
            {PieChart}
        </div>
    );
};
  export default PieChart;