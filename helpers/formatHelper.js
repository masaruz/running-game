module.exports = {
  /**
   * remove only key but keep value
   * automatic return array if it is json array
   * @param {JSON} json
   */
  removeJsonKey (json) {
    let len = Object.keys(json).length
    let result = []
    for (var key in json) {
      if (len === 1) {
        result = json[key]
      } else if (len > 1) {
        result.push(json[key])
      }
    }
    return result
  }
}
