import { catchTimeout } from "../index.js";

const DELAY_MS = 500
const INVALID_JSON = "{a,b,c:d,e:[fg,h]}"
const VALID_JSON = '{"a": 1}'





function sync_callback_example_ok(){
    // do stuff
    return JSON.parse(VALID_JSON)
}

function sync_callback_example_err(){
    //do something that throws an exceptions
    const parsed = JSON.parse(INVALID_JSON)
    return parsed
}

function sync_callback_example_arg(input){
    return JSON.parse(input)
}


async function main(){
    console.log("\n\nSync Callback Example == `catchTimeout`")

    const r1 = await catchTimeout(sync_callback_example_ok,DELAY_MS);
    console.assert(!!r1.ok && !r1.err)

    console.log("\n'Ok' Response: ", r1)
    
    const r2 = await catchTimeout(sync_callback_example_err,DELAY_MS);
    console.assert(!r2.ok && r2.err != undefined)
    console.log("\n'err' Response: ", r2)

    
    
    
    //r3 and r4 show how to use input `cbArgs`
    const r3 = await catchTimeout(sync_callback_example_arg,DELAY_MS,VALID_JSON) //will 'ok'
    console.assert(!!r3.ok && !r3.err)
    console.log("\n'Ok' Response (with args): ", r3)
    const r4 = await catchTimeout(sync_callback_example_arg,DELAY_MS,INVALID_JSON) //will 'err'
    console.assert(!r4.ok && !!r4.err)
    console.log("\n'err' Response: (with args): ", r4)


    //does not require being 'awaited' will still catch the error
    catchTimeout(sync_callback_example_err,1)
    console.log("[DONE] - Survived callbacks with uncaught exceptions")
}

main()