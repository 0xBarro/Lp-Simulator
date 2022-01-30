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
    
        chart = new Chart(
      document.getElementById('myChart'),
      config
    );
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