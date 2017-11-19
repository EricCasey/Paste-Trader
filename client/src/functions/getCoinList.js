function getCoinList() {

  fetch(`http://localhost:3001/api/coinlist/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }).then(json => {
    var coinArray = [['- SELECT A BASE COIN BELOW - '], [0]
    ];
    //console.log(json.Data)
    Object.entries(json.Data).forEach(([key, value]) => {
      coinArray[0].push(value.FullName)
      coinArray[1].push(value.Id)
    });
    this.setState({coinList: coinArray})
  })


}

export default getCoinList
