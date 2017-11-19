function getExchanges() {
  fetch(`http://localhost:3001/api/exchanges/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }).then(json => {
    // console.log(json)
    this.setState({
      exchanges: Object.keys(json.Data)
    })
  })
}

export default getExchanges
