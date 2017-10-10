"use strict";

import {
  Store,
  Dispatcher,
  combineReducers,
  Reducer,
  State
} from "../";

import {StoreProvider} from "./store.provider.intf";
import {ngrxDispatcherName, ngrxReducerName, ngrxStateName} from "./constants";

export class StoreProviderImpl implements StoreProvider {
  public INITIAL_REDUCER: any;
  public INITIAL_STATE: any;

  public static $inject: string[] = [];

  public constructor() {
    this.$get.$inject = [ngrxDispatcherName, ngrxReducerName, ngrxStateName];
  }

  public $get(dispatcher: Dispatcher, reducer: Reducer, state$: State<any>): Store<any> {
    return new Store<any>(dispatcher, reducer, state$);
  }

  public provideStore(initialReducer: any, initialState?: any): void {
    this.INITIAL_REDUCER = this.getInitialReducer(initialReducer);
    this.INITIAL_STATE = this.getInitialState(this.INITIAL_REDUCER, initialState);
  }

  public getReducer(): any {
    return this.INITIAL_REDUCER;
  }

  public getState(): any {
    return this.INITIAL_STATE;
  }

  private getInitialReducer(reducer: any): any {
    if (typeof reducer === "function") {
      return reducer;
    }
    return combineReducers(reducer);
  }

  private getInitialState(reducer: any, initialState: any): any {
    if (initialState === undefined) {
      return reducer(undefined, {type: Dispatcher.INIT});
    }
    return initialState;
  }
}
