const request = require('request');

module.exports = (req, res) => {
    console.log("CC coinsnap - " + req.params.coin1)
    var coin1 = req.params.coin1
    request({
      method: 'get',
      url: `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${coin1}`,
      headers: { 'Content-Type': 'application/json' }
    }, function(error, response, body) {
      console.log('CC coinsnap status - ', response.statusCode);
      res.send(body)
    });
}
