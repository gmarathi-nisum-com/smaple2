import {fromJS, List, Map} from 'immutable'

export function createAction (type, ...argNames) {
  return function (...args) {
    let action = {type}
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export function setLoading (state, funcName = '', id, bool = true) {
  return state.setIn(['requests', funcName, id, 'loading'], bool)
}

export function handleError (state, funcName = '', id, errors = []) {
  return state.setIn(['requests', funcName, id], fromJS({
    loading: false,
    errors
  }))
}