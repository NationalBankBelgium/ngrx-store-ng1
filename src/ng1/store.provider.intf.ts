"use strict";

import {IServiceProvider} from "angular";

export interface StoreProvider extends IServiceProvider {
  provideStore(initialReducer: any, initialState?: any): void;

  getState(): any;

  getReducer(): any;
}
