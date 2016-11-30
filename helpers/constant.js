module.exports = {
  NODE: {
    USERS: 'users',
    GAME_1: 'game1',
    GAME_2: 'game2',
    PICTURES: 'pictures' 
  },
  ERROR: {
    NOT_FOUND: {
      errorCode: 422,
      message: 'Not found'
    },
    MISSING_PARAM: {
      errorCode: 400,
      message: 'Missing parameter.'
    },
    INVALID_PARAM: {
      errorCode: 400,
      message: 'Invalid parameters.'
    }
  }
}
