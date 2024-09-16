import { catchTimeoutPromise } from "../index.js";

const DELAY_MS = 500
const VALID_JSON = '{"a": 1}'
const INVALID_JSON = '{a,b,c,[d,e,f], g: "oof"}'
const do_some_work = (ms) => new Promise((resolve)=>setTimeout(resolve,ms))


async function async_callback_example(input){
    await do_some_work(100) //simulate working for 100ms
    return JSON.parse(input)
}



async function main(){
    console.log("\n\nAsync Callback Example == `catchTimeoutPromise`")
    const r1 = await catchTimeoutPromise(async_callback_example,DELAY_MS,VALID_JSON)
    console.assert(!!r1.ok && !r1.err)
    console.log("'Ok' Response: ", r1)
    const r2 = await catchTimeoutPromise(async_callback_example,DELAY_MS,INVALID_JSON)
    console.assert(!r2.ok && !!r2.err)
    console.log("'Error' Response: ", r2)

    console.log("[DONE] - Survived Async Callbacks with uncaught exceptions")

}

main()



