let chart = undefined;

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
    
      chart = new Chart(document.getElementById('myChart'), config );
}


const balancePool = () => {
  const a = 1;
}

const getValues = () => {
  return {
    nA: +document.getElementById("assetANT").value,
    upA: +document.getElementById("assetAUP").value,
    nB: +document.getElementById("assetBNT").value,
    upB: +document.getElementById("assetBUP").value,
    get vA() {return this.nA * this.upA},
    get vB() {return this.nB * this.upB},
    get data() {return [this.vA, this.vB]}
  }
}

 const updateChart = () => {
  const formValues = getValues()

  // Update Charts
  chart.data.datasets[0].data = formValues.data
  chart.update()
}

const swapConstant = () => {
  const amountSold = +document.getElementById("amount").value
  const tA = document.getElementsByName("ts")[0].checked
  const tB = document.getElementsByName("ts")[1].checked

  console.log(tA, tB)

  if (!tA && !tB) {
    alert("Select one token to swap!")
  } else if (amountSold <= 0) {
    alert("Amount to swap must be geater than 0!")
  } else {
    const k =  +document.getElementById("assetANT").value * +document.getElementById("assetBNT").value  // Pool constant

    console.log("Constant: ", k)

    // TODO: Improve this
    const tokenSold = (tA) ? "assetANT" : "assetBNT"
    const tokenBought = (tA) ? "assetBNT" : "assetANT"

    // Add token to the pool
    document.getElementById(tokenSold).value = +document.getElementById(tokenSold).value + amountSold;

    // Calculate the number obtained of the other asset. 
    // The constant formula looks like this: nTokensA * nTokensB = k.

    const amountBought = k / +document.getElementById(tokenSold).value
    document.getElementById(tokenBought).value = +document.getElementById(tokenBought).value - amountBought;

    console.log(amountBought)

    updateChart()

  }
}

const swap = () => {
  poolModes[poolMode]()
}


const poolModes = {
  constant: swapConstant
}

let poolMode = "constant"