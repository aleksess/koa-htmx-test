
/**
 * @typedef {import('koa').ParameterizedContext} Context
 * @typedef {import('koa').Next} Next
 */


/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.responseTypeMiddleware = async (ctx, next) => {
    if (ctx.get('Content-Type') === 'application/json') {
        ctx.responseType = 'json'
    } else {
        ctx.responseType = ctx.query.partial ? 'htmx' : 'html';
    }

    await next();
}