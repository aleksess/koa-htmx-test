const db = require('../database');
const { NotFoundError } = require('../errors');
const { formatResponse } = require('../lib/format-response');


/**
 * @typedef {import('koa').ParameterizedContext} Context
 * @typedef {import('koa').Next} Next
 */


/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.all = async (ctx, next) => {
    const comments = await db('comments').select(['content']).where({'post_id': ctx.params.postId})

    await formatResponse(ctx, {
        htmx: ctx => ctx.render('comments/_comments', {comments}),
    })
}


/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.create = async (ctx, next) => {
    console.log(ctx)
    const comment = (await db('comments').insert({post_id: ctx.params.postId, content: ctx.request.body.comment.content}).returning("*"))[0];
    console.log(comment);
    await formatResponse(ctx, {
        htmx: ctx => ctx.render("comments/_comment", {comment}),
        json: async ctx => ctx.body = JSON.stringify(comment)
    })
}

