/** 
 *  @typedef {import('koa').ParameterizedContext} Context
*/

/**
 * @param {Context} ctx
 * @param {{html: Function, json: Function, htmx: Function}} formatters
 */
module.exports.formatResponse = async (ctx, formatters) => {
    const responseType = ctx.responseType ?? 'html';
    const { html, htmx, json } = formatters;

    switch (responseType) {
        case 'json':
            await json(ctx);
            break;
        case 'htmx': 
            await htmx(ctx);
            break;
        case 'html':
        default: 
            await html(ctx);
            break;
    }
}