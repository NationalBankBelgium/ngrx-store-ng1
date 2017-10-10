# @nationalbankbelgium/ngrx-store

This is a backport of ngrx-store (https://github.com/ngrx/store) for AngularJS.
The benefit of using this is that you can already start writing code that's ready for new Angular versions, making your legacy application easier to upgrade later on.

### Installation
Install @nationalbankbelgium/ngrx-store from npm:

```
npm install @nationalbankbelgium/ngrx-store --save
```

### Setup
Create a reducer function for each data type you have in your application. The combination of these reducers will
make up your application state:

```ts
// counter.ts
import { ActionReducer, Action } from "@nationalbankbelgium/ngrx-store";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export function counterReducer(state: number = 0, action: Action) {
	switch (action.type) {
		case INCREMENT:
			return state + 1;

		case DECREMENT:
			return state - 1;

		case RESET:
			return 0;

		default:
			return state;
	}
}
```

In your app's main module, import those reducers and use the `$storeProvider.provideStore(reducers)`
function to provide them to Angular's injector:

```ts
import { StoreModule } from "@nationalbankbelgium/ngrx-store";
import { ngrxStoreProviderName, StoreProvider } from "@nationalbankbelgium/ngrx-store/ng1";
import { counterReducer } from "./counter";

export class AppModule {
  public static $inject: string[] = [ngrxStoreProviderName];

  public constructor(private $storeProvider: StoreProvider) {
    appModule: IModule;
    
    this.appModule.config(this.$storeProvider.provideStore({ counter: counterReducer }))
    
    ...
  }
  
  ...
}
```


You can then inject the `Store` service into your components and services. Use `store.select` to
_select_ slice(s) of state:

```ts
import { Store } from "@nationalbankbelgium/ngrx-store";
import { INCREMENT, DECREMENT, RESET } from "./counter";

interface AppState {
  counter: number;
}

export class MyAppComponent implements IController {

  public static selector: string = "my-app";
  
  public static componentOptions: IComponentOptions = {
    controller: MyAppComponent,
    template: `
    		<button (click)="$ctrl.increment()">Increment</button>
    		<div>Current Count: {{ $ctrl.counter | async }}</div>
    		<button (click)="$ctrl.decrement()">Decrement</button>
    
    		<button (click)="$ctrl.reset()">Reset Counter</button>
    	`
  }
  
  counter: Observable<number>;
  
  constructor(private store: Store<AppState>){
    this.counter = store.select("counter");
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }
})
```


## Contributing
### Submitting Pull Requests

**Please follow these basic steps to simplify pull request reviews - if you don't you'll probably just be asked to anyway. Note that we're not willing to diverge from the original ngrx-store feature-set. This is only intended as a simple backport with no additional features.**

* Please rebase your branch against the current master
* Run ```npm install``` to make sure your development dependencies are up-to-date
* Please ensure the test suite passes before submitting a PR
* If you've added new functionality, **please** include tests which validate its behaviour
* Make reference to possible [issues](https://github.com/NationalBankBelgium/ngrx-store-ng1/issues) on PR comment

### Submitting bug reports

* Please detail the affected browser(s) and operating system(s)
* Please be sure to state which version of node **and** npm you're using

## License
This project is licensed under the terms of the European Public License (EUPL) open source license. You can find the complete terms in the [LICENSE](LICENSE) file.

Note that this project includes a copy of subset of the original ngrx-store codebase. Those remain bound to their original MIT license.
