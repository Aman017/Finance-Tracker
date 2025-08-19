import { Line, Pie } from '@ant-design/charts';
import React from 'react'

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

 const spendingData = sortedTransactions
  .filter((transaction) => transaction.type === "expense")
  .map((transaction) => ({
    tag: transaction.tag,
    amount: transaction.amount,
  }));

  let finalSpendingData = spendingData.reduce((acc, obj) => {
let key = obj.tag;
if (!acc[key]) {
    acc[key] = { tag: obj.tag, amount: obj.amount};
}else{
    acc[key].amount += obj.amount;
}
return acc;
  }, {});


let newSpendings = [{tag:"food", amount: 0},{tag:"education", amount:0}, {tag:"office", amount:0}];
spendingData.forEach((item)=>{
if(item.tag =="food"){
    newSpendings[0].amount += item.amount;
}else if(item.tag =="education"){
    newSpendings[1].amount += item.amount;
}
else if(item.tag =="office"){
    newSpendings[2].amount += item.amount;
}
})

  const config = {
  data:data,
  width: 750,
  height: 400,
  autoFit: true,
  xField: 'date',
  yField: 'amount',
  smooth: true,
};
    const Spendingconfig = {
        data:newSpendings,
       width: 350,
    height: 400,
        autoFit: true,
        angleField: 'amount',
        colorField: 'tag',
        legend: { position: 'bottom' }
        
    };
  let chart;
  let pieChart;

  return (
    <div className="carts-wrapper">
      <div>
        <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
      </div>
      <div>
        <h2>Your Spendings</h2>
        <Pie {...Spendingconfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
      </div>
    </div>
  );
};

export default Charts
