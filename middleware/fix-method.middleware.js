/**
 * @typedef {import('koa').ParameterizedContext} Context
 * @typedef {import('koa').Next} Next
 */


/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.fixMethodMiddleware = async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.request.body._method !== null && ctx.request.body._method !== ctx.method) {
        ctx.method = ctx.request.body._method;
    }
    await next();
}