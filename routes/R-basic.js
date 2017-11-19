const request = require('request');

module.exports = (req, res) => {
    console.log("CC basic - " + req.params.query)
    var query = req.params.query.split('.')
    console.log(query)
    var c1 = query[0],
        c2 = query[1],
        ex = query[2],
        type = query[3],
        units = query[4],
        agr = query[5]
    var builtURL = "https://min-api.cryptocompare.com/data/" + type + "?fsym=" + c1 + "&tsym=" + c2 + "&limit=" + units + "&aggregate=" + agr + "&e=" + ex
    console.log(builtURL)
    request({
      method: 'get',
      url: builtURL,
      headers: { 'Content-Type': 'application/json' }
    }, function(error, response, body) {
      console.log('CC histoday status - ' + response.statusCode);
      // console.log(body)
      res.send(body)
    });
}
