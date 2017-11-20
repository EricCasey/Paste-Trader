// import timestamp from 'time-stamp';

function generateDeposits(e) {

var full = e.target.value.split('\n'),
    dateArray = [],
    valueArray = [],
    fullDateArray = [],
    fullDepositArray = [],
    value = 0

try {
  if(full[0][0] === 'D') {
    full.map((deposit, i) => {
      var part = deposit.split(',')
      var date = part[0].split(" ")[0]
      if (i===0) {return
      } else if  (dateArray.indexOf(date) !== -1) {
        // console.log('duplicate date')
        // console.log(dateArray.indexOf(date))
        valueArray[dateArray.indexOf(date)] += Number(part[2])
      } else {
        dateArray.push(date)
        valueArray.push(Number(part[2]))
      }

    })

    dateArray.pop()
    valueArray.pop()
    dateArray.reverse()
    valueArray.reverse()
    // console.log(dateArray, valueArray)

    var date1 = new Date();
    var date2 = new Date(dateArray[0]);
    var day;
    var between = [date1];

    while(date2 <= date1) {
        day = date1.getDate()
        date1 = new Date(date1.setDate(--day));
        between.push(date1);
    }

    // console.log(between);

    between.reverse().map((datec, i) => {
      var arrDate = datec.toString().split(' ')
      var month = arrDate[1];
      if (month === "Jan") {
        month = '01'
      } else if (month === "Feb") {
        month = '02'
      } else if (month === "Mar") {
        month = '03'
      } else if (month === "Apr") {
        month = '04'
      } else if (month === "May") {
        month = '05'
      } else if (month === "Jun") {
        month = '06'
      } else if (month === "Jul") {
        month = '07'
      } else if (month === "Aug") {
        month = '08'
      } else if (month === "Sep") {
        month = '09'
      } else if (month === "Oct") {
        month = '10'
      } else if (month === "Nov") {
        month = '11'
      } else {
        month = '12'
      }
      // console.log(year + "-" + month + "-" + day)
      var builtDate = arrDate[3] + "-" + month + "-" + arrDate[2]
      // console.log(builtDate)
      if(dateArray.indexOf(builtDate) === -1) {
        // console.log("no buy on " + builtDate)
      } else {
        // console.log("purchase BTC " + value + " on " + builtDate)
        value += Number(valueArray[dateArray.indexOf(builtDate)])

        // console.log("new value = " + value)
      }

      fullDateArray.push(builtDate)
      fullDepositArray.push(value)

    })

    fullDateArray.shift()
    fullDepositArray.shift()

    // console.log(fullDateArray)
    // console.log(fullDepositArray)

    this.setState({
      growingBTC: fullDepositArray,
      fullDateArray: fullDateArray,
      goodD: true
    })
  } else {
    this.setState({
      goodD: 'invalid'
    })
  }
}
catch(e) {
  this.setState({
    goodD: 'invalid'
  })
}


}

export default generateDeposits

// {
//   name: "BTC",
//   x: [Dates],
//   y: [values]
// }
