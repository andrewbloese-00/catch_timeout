# Catch Timeout 
Provides utility functions to act as safer alternatives to `setTimeout`, preventing process crashes from uncaught errors in timeout callbacks. Syntax is (almost) the same as `setTimeout` but with the ability to pass arguments to the callback. 

## Installation/Requirements
- requires NodeJS (tested on v22.5.1)
- clone this repository (or just copy paste from index.js)



## Examples
To run the example code: 
```bash
npm run test
```
which will execute the test/example code for sync and async callbacks. 


## Important Notes
* catchTimeout and catchTimeoutPromise will NEVER `reject()`, only `resolve()` with an `ok` or `err` value. 


## Usage
``` javascript
//import helper
import { catchTimeout } from 'path/to/index.js'

//a callback that might throw an error
function sync_example(input){
    return JSON.parse(input)
}

// with setTimeout - no errors are caught, and 
// must explicitly create another closure to pass arguments
setTimeout(()=>sync_example("input"),100)


// with catchTimeout - errors are caught (treated as values), 
// and easily pass arguments
catchTimeout(sync_example,100, "input")


//await the result of catchTimeout to observe its result
async function observeTimeoutResultExample(){
    const { ok , err } = await catchTimeout(sync_example,100,"input")
    if(err) console.error(err)
    console.log(ok)
}
```

### What if I have an Async Callback? 
```javascript
   import { catchTimeoutPromise} from 'path/to/index.js'
   
   const wait = ms => new Promise((r)=>setTimeout(r,ms))

   async function async_cb_example(input){
        //simulate some work
        await wait(100)
        return JSON.parse(input)
   }


   catchTimeoutPromise(async_cb_example, 100, "input")
        .then(({ok,err})=>{
            // can be awaited just like `catchTimeout` 
            // to observe results
        })
```



