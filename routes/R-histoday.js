const request = require('request');

module.exports = (req, res) => {
    console.log("CC histoday - " + req.params.combo)
    request({
      method: 'get',
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=500&aggregate=5&e=BitTrex`,
      headers: { 'Content-Type': 'application/json' }
    }, function(error, response, body) {
      // console.log('CC histoday status - ' + response.statusCode);
      res.send(body)
    });
}
