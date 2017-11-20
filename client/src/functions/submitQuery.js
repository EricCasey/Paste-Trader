function submitQuery(c1, c2, ex, type, units, agr, typeQ) {

  // console.log(typeQ)
  this.setState({
    priceData: [],
    priceLine: [],
    firstPrice: 0,
    firstDate: '',
    count: 0,
    lowestPrice: 0,
    highestPrice: 0
  })
  var query = c1 + "." + c2 + "." + ex + "." + type + "." + units + "." + agr;
  //console.log("QUERY! - " + query)
  fetch(`http://localhost:3001/api/basicquery/${query}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }).then(json => {
    // console.log(json)
    var timeHistory = [];
    var closeHistory = [];
    var openHistory = [];
    var highHistory = [];
    var lowHistory = [];
    var unixTime = [];
    json.Data.map((point, index) => {
      // console.log(point)
      // console.log("TIMESTAMP - "+ timestamp.toDate(point.time));
      var date = new Date(point.time * 1000),
        str = date.toDateString(),
        splitr = str.split(" "),
        year = splitr.pop(),
        day = splitr[splitr.length - 1],
        month;

      var monthX = splitr[splitr.length - 2]
      if (monthX === "Jan") {
        month = '01'
      } else if (monthX === "Feb") {
        month = '02'
      } else if (monthX === "Mar") {
        month = '03'
      } else if (monthX === "Apr") {
        month = '04'
      } else if (monthX === "May") {
        month = '05'
      } else if (monthX === "Jun") {
        month = '06'
      } else if (monthX === "Jul") {
        month = '07'
      } else if (monthX === "Aug") {
        month = '08'
      } else if (monthX === "Sep") {
        month = '09'
      } else if (monthX === "Oct") {
        month = '10'
      } else if (monthX === "Nov") {
        month = '11'
      } else {
        month = '12'
      }

      // console.log(year + "-" + month + "-" + day)
      var builtDate = year + "-" + month + "-" + day
      // console.log(builtDate)
      if (point.close === 0) {
        // if there's a dead day?
      } else {
        timeHistory.push(builtDate)
        closeHistory.push(point.close)
        openHistory.push(point.open)
        highHistory.push(point.high)
        lowHistory.push(point.low)
        unixTime.push(point.time * 1000)
      }
      return [];
    })
    return [
      timeHistory,
      closeHistory,
      openHistory,
      highHistory,
      lowHistory,
      unixTime
    ];
  }).then(history => {
    // console.log(history)
    var firstDate = history[0][0]
    //console.log(history[1])
    if (typeQ === 'conversion') {
      // console.log("conversion Data requested")
      // console.log(history)
      var usdbtcLine = [],
          btcLine = this.state.btcLine,
          oldPieVisData = this.state.pieVisData,
          oldHistVisData = this.state.histVisData

      btcLine.map((amount, i) => {
        // console.log(history[1][i])
        // console.log(amount)
        // console.log(amount * history[1][i] + " in USD?!?!")
        usdbtcLine.push(amount * history[1][i])
      })

      this.setState({
        conversionData: {
          firstPrice: history[0][0][1],
          firstDate: JSON.stringify(firstDate),
          count: history[0].length,
          lowestPrice: Math.min.apply(Math, history[1]),
          highestPrice: Math.max.apply(Math, history[1]),
          openHistory: history[2],
          closeHistory: history[1],
          highHistory: history[3],
          lowHistory: history[4],
          timeHistory: history[0]
        },
        histVisData: oldHistVisData.concat({
          'x': history[0],
          'y': usdbtcLine,
          'name': "BTC",
          'line': {
            'shape': 'hv'
          }
        }),
        pieVisData: oldPieVisData.concat({
          'x': history[0],
          'y': usdbtcLine,
          'name': "BTC",
          'line': {
            'shape': 'hv'
          }
        })
      })


    } else if (typeQ === "vis") {
      var closeHistory = history[1], // is this coin1/btc?
        allTime = this.state.conversionData.timeHistory,
        coinDates = [],
        coinValues = [],
        dayCount = 0,
        coinAmountValues = [],
        amount = 0,
        coinUSDValues = [],
        conversionData = this.state.conversionData.closeHistory,
        timeHistory = history[0]

      // console.log("conversion Data then time history")
      // console.log(conversionData)
      // console.log(timeHistory)

      allTime.map((time, i) => {
        dayCount++
        // console.log(time, i+1)
        // console.log(timeHistory)
        if (timeHistory.indexOf(time) === -1) {
          // NO TRADE MADE THAT DAY
          coinDates.push(time)
          coinValues.push(0)
          coinAmountValues.push(0)
          coinUSDValues.push(0)

        } else {
          // TRADE MADE THAT DAY
          // console.log(this.state.tradeHistory, c1)
          var profile = this.state.tradeHistory[c1]
            // console.log(profile)
            profile.forEach((trade, i) => {
              if (trade[0] === time) {
                // console.log("TRADE " + trade)

                var tradeAsNum = Number(trade[1]);
                Math.round(tradeAsNum * 100) / 100
                amount += tradeAsNum;
              }
            })
            coinDates.push(time)
            coinValues.push(closeHistory[timeHistory.indexOf(time)])
            //console.log(amount + " " + c1)
            coinAmountValues.push(amount)
            // convert amount to USD
            // console.log(closeHistory)
            // console.log(timeHistory)
            // console.log(closeHistory[timeHistory.indexOf(time)] + " BTC per " + c1)
            var btcPer = closeHistory[timeHistory.indexOf(time)],
              btcTotal = closeHistory[timeHistory.indexOf(time)] * amount,
              usd = conversionData[timeHistory.indexOf(time)] * btcTotal

            // console.log(usd + " USD")
            coinUSDValues.push(usd)
            // console.log("you owned " + amount + " " + c1 + " on " + time + " Pushing")
            // console.log("Pushing " + c1 + " " + time + " " + closeHistory[timeHistory.length-i])
          }
        })
        //console.log("coinAmountValues" + c1)
        //console.log(coinAmountValues)

        var oldHistVisData = this.state.histVisData,
            oldPieVisData = this.state.pieVisData;
        this.setState({
          histVisData: oldHistVisData.concat({
            'x': coinDates,
            'y': coinUSDValues,
            'name': c1,
            'line': {
              'shape': 'spline'
            }
          }),
          pieVisData: oldPieVisData.concat({
            'x': coinDates,
            'y': coinUSDValues,
            'name': c1
          })
        })
        console.log("printing pie data")
        console.log(this.state.pieVisData)
      } else if (typeQ === "base") {
// this is where the BTC magic happens for the visualization

        // console.log("base query has happened")
        // console.log(this.state)

        // var oldVisData = this.state.visData
        // this.setState({
        //   visData: oldVisData.concat({'x': coinDates, 'y': coinUSDValues, 'fill': 'red', 'name': c1})
        // })

      } else {
        this.setState({firstPrice: history[0][0][1],
          firstDate: JSON.stringify(firstDate),
          count: history[0].length,
          lowestPrice: Math.min.apply(Math, history[1]),
          highestPrice: Math.max.apply(Math, history[1]),
          openHistory: history[2],
          closeHistory: history[1],
          highHistory: history[3],
          lowHistory: history[4],
          timeHistory: history[0],
          basicExchangeTitle: `${c1}/${c2} on ${ex}`
        })
      }

    }).then(data => {
      //  console.log("done!")
    })
  }

export default submitQuery
