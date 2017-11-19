import timestamp from 'time-stamp';

function verifyHistory(e) {

  var full = e.target.value.split('\n'),
    tradeArray = [],
    tradeDateArray = []
    // console.log(full)
    try {
      full.splice(0, 1)
      full.pop()
      full.map((trade, index) => {
        var tradeD = trade.split(','),
            coin1 = tradeD[1].split('/')[0],
            coin2 = tradeD[1].split('/')[1]
          // console.log(tradeD)
          var tradeData = {
            'date': tradeD[0],
            'coin1': coin1,
            'coin2': coin2,
            'category': tradeD[2],
            'type': tradeD[3],
            'pricePerShare': tradeD[4],
            'amount': tradeD[5],
            'fee': tradeD[7],
            'total': tradeD[6]
          }
          // console.log(tradeData)
          tradeDateArray.push(tradeD[0])
          tradeArray.push(tradeData)

        })

        var cherry = new Date(tradeDateArray.sort()[0].split(' ')[0]),
          now = timestamp(),
          date2 = new Date(now),
          timeDiff = Math.abs(date2.getTime() - cherry.getTime()),
          units = Math.ceil(timeDiff / (1000 * 3600 * 24))

        this.setState({history: tradeArray, tradingFor: units})
        this.genProfiles(tradeArray, units)
        this.getConversionData(units)
        this.setState({
          goodT: true
        })
    }
    catch(e) {
      console.log(e)
      this.setState({
        goodT: 'invalid'
      })
    }

}

export default verifyHistory
