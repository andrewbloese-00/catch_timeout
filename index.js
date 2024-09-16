

/**
* @typedef {Object} SafeTimeoutResponse
* @property {Error|undefined} err
* @property {any} ok
* @description Contains an `err:Error` field or `ok:any` field. err is any exception caught by the helper.
*/


/**
 * 
 * @param {(...args:any)=>any} callback a function with 0 or more arguments to be called after some timeout delay
 * @param {number} delay the number of milliseconds to wait before executing callback function
 * @param  {...any} cbArgs 0 or more arguments to pass to the provided callback function
 * @returns {Promise<SafeTimeoutResponse>}
 */
export const catchTimeout = (callback,delay,...cbArgs) => new Promise((resolve) => {
    setTimeout(()=>{
    try {
        const val = callback(...cbArgs)
        return resolve({ok:val || true})
    } catch(err){
        return resolve({err})
    }
},delay)

})


/**
 * 
 * @param {(...args:any)=>Promise<any>} asyncCallback an async function with 0 or more arguments to be called after some timeout delay
 * @param {number} delay the number of milliseconds to wait before executing callback function
 * @param  {...any} cbArgs 0 or more arguments to pass to the provided callback function
 * @returns {Promise<SafeTimeoutResponse>}
 */
export const catchTimeoutPromise = (asyncCallback,delay,...cbArgs) => new Promise((resolve)=>{
setTimeout(async ()=>{
    try {
        const ok = (await asyncCallback(...cbArgs)) || true;
        return resolve({ ok })

    } catch(err){
        return resolve({err})
    }
},delay)
})