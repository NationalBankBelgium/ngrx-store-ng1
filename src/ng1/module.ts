"use strict";

import {IModule} from "angular";
import * as angular from "angular";

import IProvideService = ng.auto.IProvideService;
import {
  Dispatcher,
  Reducer,
  State
} from "../";
import {
  ngrxStoreName,
  ngrxModuleName,
  ngrxStoreProviderName,
  ngrxDispatcherName,
  ngrxReducerName,
  ngrxStateName
} from "./constants";
import {StoreProviderImpl} from "./store.provider";
import {StoreProvider} from "./store.provider.intf";

export const ngrxStoreNg1Module: IModule = angular.module(ngrxModuleName, []);

ngrxStoreNg1Module.config([ngrxStoreProviderName, "$provide", ($storeProvider: StoreProvider, $provide: IProvideService) => {

  $provide.factory(ngrxDispatcherName, () => {
    return new Dispatcher();
  });

  $provide.factory(ngrxReducerName, [ngrxDispatcherName, (dispatcher: Dispatcher) => {
    return new Reducer(dispatcher, $storeProvider.getReducer());
  }]);

  $provide.factory(ngrxStateName, [ngrxDispatcherName, ngrxReducerName, (dispatcher: Dispatcher, reducer: Reducer) => {
    return new State($storeProvider.getState(), dispatcher, reducer);
  }]);
}]);

ngrxStoreNg1Module.provider(ngrxStoreName, StoreProviderImpl);
