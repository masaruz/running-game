module.exports = {
  /**
   * remove only key but keep value
   * automatic return array if it is json array
   * @param {JSON} json
   * @return json or array
   */
  removeJsonKey (json) {
    if (!json) return null
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
  },
  /**
   * get only key without value
   * @param {JSON} json
   * @return string or array
   */
  getJsonKey (json) {
    if (!json) return null
    let len = Object.keys(json).length
    let result = []
    for (var key in json) {
      if (len === 1) {
        result = key
      } else if (len > 1) {
        result.push(key)
      }
    }
    return result
  }
}
