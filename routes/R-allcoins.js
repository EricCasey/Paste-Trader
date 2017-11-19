const request = require('request');

module.exports = (req, res) => {
  console.log("CC coinlist - " + req.params.combo)
  request({
    method: 'get',
    url: 'https://www.cryptocompare.com/api/data/coinlist',
    headers: { 'Content-Type': 'application/json' }
  }, function(error, response, body) {
    console.log('CC coinlist status - ', response.statusCode);
    res.send(body)
  });
}
