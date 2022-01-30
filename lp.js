// Initial funtion to create the chart
const createChart = () => {

  values = getValues()
  console.log(values, values.data)

  const labels = [
    'Asset A',
    'Asset B',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'LP Token Balance',
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      borderColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      data: values.data,
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {}
  };

  chart = new Chart(document.getElementById('myChart'), config);
}

// Get's the form values 
const getValues = () => {
  return {
    nA: +document.getElementById("assetANT").value,
    upA: +document.getElementById("assetAUP").value,
    nB: +document.getElementById("assetBNT").value,
    upB: +document.getElementById("assetBUP").value,
    get vA() { return this.nA * this.upA },
    get vB() { return this.nB * this.upB },
    get data() { return [this.vA, this.vB] }
  }
}

// Updates the chards based on the form values
const updateChart = () => {

  // Update Charts
  chart.data.datasets[0].data = getValues().data
  chart.update()
}

const swapConst = (nA, nB, sellAmountA) => {
  const k = nA * nB
  const tokensReturned =  nB - (k/(nA + sellAmountA))
  console.log(nA, nB, sellAmountA, k, tokensReturned)
  return tokensReturned
}

// Adjusts the pool based on the selected swap mode
const swap = (update) => {

  const buyTokenPoolAmount = +document.getElementById(buyToken + "NT").value
  const sellTokenPoolAmount = +document.getElementById(sellToken + "NT").value
  const sellAmount = +document.getElementById("sellAmount").value

  const boughtAmount = poolModes[poolMode](sellTokenPoolAmount, buyTokenPoolAmount, sellAmount)

  if (update) {
    // Update quantities in the pool
    document.getElementById(buyToken + "NT").value = buyTokenPoolAmount - boughtAmount
    document.getElementById(sellToken + "NT").value = sellTokenPoolAmount + sellAmount

    // Update the chart
    updateChart()
  } else {
    document.getElementById("buyAmount").innerText = boughtAmount
  }

}

const inverseSwap = () => {
  const _buyToken = buyToken
  buyToken  = sellToken
  sellToken = _buyToken
  
  // Update the tags
  fillTokenNames()
}

const fillTokenNames = () => {
  document.getElementById("sellToken").innerText = sellToken
  document.getElementById("buyToken").innerText = buyToken
}

// Called when starting the page
const init = () => {
  createChart() // Draw the plot
  fillTokenNames()
  swap()
}


// Some global variables
let chart = undefined;

const poolModes = {
  constant: swapConst
}

let poolMode = "constant"
let buyToken = "assetA"
let sellToken  = "assetB"