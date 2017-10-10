import {ActionReducer} from "./reducer";

export function combineReducers(reducers: any): ActionReducer<any> {
  const reducerKeys: string[] = Object.keys(reducers);
  const finalReducers: any = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key: string = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys: string[] = Object.keys(finalReducers);

  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState: any = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key: string = finalReducerKeys[i];
      const reducer: ActionReducer<any> = finalReducers[key];
      const previousStateForKey: any = state[key];
      const nextStateForKey: any = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
