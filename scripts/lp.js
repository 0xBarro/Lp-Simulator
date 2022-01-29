const createChart = (nA, vA, nB, vB) => {
  console.log(nA, vA)
    const labels = [
        'Asset A',
        'Asset B',
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'LP Token Balance',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [nA * vA, nB * vB],
        }]
      };
    
      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      };
    
      const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
}


const balancePool = () => {
  const a = 1;
}

const drawChart = () => {
  const formValues = getValues();
  createChart(formValues.nA, formValues.vA, formValues.nB, formValues.vB)
}

const getValues = () => {
  const formValues = {
    nA: +document.getElementById("assetANT").value,
    vA: +document.getElementById("assetAUP").value,
    nB: +document.getElementById("assetBNT").value,
    vB: +document.getElementById("assetBUP").value
  }

  console.log("Current Value are: ", formValues)
  return formValues
}