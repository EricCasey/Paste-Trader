const request = require('request');

module.exports = (req, res) => {
    console.log("CC exchangelist - ")
    request({
      method: 'get',
      url: 'https://www.cryptocompare.com/api/data/exchanges',
      headers: {'Content-Type': 'application/json'}
    }, function(error, response, body) {
      console.log('CC exchangelist status - ', response.statusCode);
      // console.log(body)
      res.send(body)
    });
}
