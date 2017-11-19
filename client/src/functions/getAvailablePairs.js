function getAvailablePairs(coin1) {

    fetch(`http://localhost:3001/api/coinsnap/${coin1}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then(json => {
      // console.log(json)
      var pairArray = [];
      var exPairArray = [];
      Object.entries(json.Data.Subs).forEach(([key, value]) => {
        var coin2 = value.split("~")
        var pair = coin2[3]
        var exch = coin2[1]
        // console.log(coin2 + "<--- COIN2")
        // console.log(pair + "<--- PAIR")
        // console.log(exch + "<--- EXCH")
        if (pairArray.indexOf(pair) === -1) {
          pairArray.push(pair)
        }
        if (exPairArray.indexOf(exch) === -1) {
          exPairArray.push(exch)
        }
      });
      // console.log(pairArray)
      this.setState({availPairs: pairArray, exchangePair: exPairArray})
    })


}

export default getAvailablePairs
