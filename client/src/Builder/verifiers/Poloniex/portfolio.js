function verifyPortfolio(e) {

  var full = e.target.value.split("\n")
  // console.log(full)
    var rawValue = full[4],
        holdingsArray = [],
        coin1s = []
    full.splice(0, 14)
    full.splice(full.indexOf("Looking for your Deposit & Withdrawal History?"), 100)
    full.splice(full.indexOf("Table data filtered. Clear filters."), 100)

    try {
      full.map((coin, index) => {
        var coinD = coin.split('\t')
        // console.log(coinD)
        if (coinD[0] === "Temporarily Disabled") {
          return
        } else if (coinD[2] === "0.00000000") {
          // console.log("you dowt own " + coinD[1])
          return
        } else {
          var coinData = {
            'ticker': coinD[0],
            'name': coinD[1],
            'position': coinD[2],
            'onOrder': coinD[3],
            'toBTC': coinD[4]
          }
          coin1s.push(coinD[0])
        }
          holdingsArray.push(coinData)
      })

      if (rawValue[0] === "E") {
        this.setState({
          rawValue: rawValue,
          portfolio: holdingsArray,
          coins: coin1s,
          goodP: true
        })
      } else {

        this.setState({
          goodP: "invalid"
        })
      }
    }
    catch (e) {
      // console.log("invalid! you goof")
      this.setState({
        goodP: "invalid"
      })
    }
    // console.log(holdingsArray)

}

export default verifyPortfolio
