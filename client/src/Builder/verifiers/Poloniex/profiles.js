import timestamp from 'time-stamp';

function generateProfiles(trades, units) {
// console.log("generating")
  var profiles = this.state.coinProfiles,
      tradeInfo = {},
      coinTradeDays = {},
      amountHistory = [],
      growingBTC = this.state.growingBTC,
      totalSold = 0,
      totalPurch = 0,
      BTCinfo = {}

    // console.log(trades.length + " trades!")
  trades.map((trade, index) => {

    console.log(trade)
    var change = 0,
        btcChange = 0,
        valueObject = {},
        BTCthatDay = growingBTC[this.state.fullDateArray.indexOf(trade.date.split(' ')[0])]

        // console.log(growingBTC)
        // console.log(this.state.fullDateArray.indexOf(trade.date.split(' ')[0]) + " index")
        // console.log(trade.type, trade.total, " BTC worth of", trade.coin1);
        // console.log("bitcoin amount goes down on " + trade.date.split(' ')[0])
        // console.log(BTCthatDay)

    if (trade.type === "Buy") {   // bitcoin goes down
      change = trade.amount
      btcChange = Number(trade.total)
      // console.log("BTC goes down by this much")
      // console.log(btcChange)
    } else {                    // bitcoin amount would go up
      change = trade.amount - (trade.amount * 2)
      btcChange = Number(trade.total) - (Number(trade.total) * 2)
      // console.log("BTC goes up by this much")
      // console.log(btcChange)
    }

    if (BTCinfo.hasOwnProperty(trade.date.split(' ')[0])) {
      // console.log("that day is in here alreasy")
      var oldBTCinfo = BTCinfo[trade.date.split(' ')[0]]
      oldBTCinfo.push([ trade.date.split(' ')[0] , btcChange ])
      BTCinfo[trade.date.split(' ')[0]] = oldBTCinfo;

    } else {
      // console.log("not found pushing")
      BTCinfo[trade.date.split(' ')[0]] = [ [ trade.date.split(' ')[0], btcChange ] ]
    }

    if (tradeInfo.hasOwnProperty(trade.coin1)) {

      var oldData = tradeInfo[trade.coin1],
          oldDays = coinTradeDays[trade.coin1],
          day = trade.date.split(' ')[0]

      oldData.push([day, change])
      oldDays.push(day)
      oldDays.sort()
      amountHistory.push(day)
      amountHistory.sort()

      tradeInfo[trade.coin1] = oldData
      // console.log(tradeInfo)
    } else {
      tradeInfo[trade.coin1] = [
        [
          trade.date.split(' ')[0],
          change
        ]
      ]
      coinTradeDays[trade.coin1] = [trade.date.split(' ')[0]]
      amountHistory[trade.coin1] = [trade.date.split(' ')[0]]
    }
    // console.log(BTCinfo)
    this.setState({
      coinProfiles: tradeInfo,
      coinTradeDays: coinTradeDays,
      amountHistory: amountHistory,
      btcChanges: BTCinfo
    })
  }) // end of trades.map
    // console.log("trying to make btc line")
    var changes = BTCinfo,
        growing = this.state.growingBTC,
        allTime = this.state.fullDateArray,
        btcLine = [],
        allDelta = 0,
        btc = 0

        // console.log(growing)
        // console.log(this.state.BTCchanges)
        allTime.map((day, index) => {
          // console.log(day)
          var dayDelta = 0;
          if(changes.hasOwnProperty(day)) {
            changes[day].map((trade, i) => {
              var change = trade[1]
              dayDelta -= change
            })
            // console.log(dayDelta)
            allDelta += dayDelta
            // console.log(allDelta)
            btc = growing[index] + allDelta
          } else {
            btc = growing[index] + allDelta
          }
          btcLine.push(btc)
        })
        // console.log(btcLine)
  this.raiseTrades(tradeInfo, btcLine)
  // console.log(tradeInfo.ARDR[0])
  // console.log("coinTradeDays")
  // console.log(coinTradeDays)
  // console.log("AmountHistory")
  // console.log(amountHistory)

}

export default generateProfiles
