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
    const posts = await db('posts').select('*');

    await formatResponse(ctx, {
        html: ctx => ctx.render('posts/posts', {posts}),
        json: async ctx => ctx.body = JSON.stringify(posts)
    })
}

/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.show = async (ctx, next) => {
    const post = await db('posts').select('*').where('id', ctx.params.id).first();

    if (!post) {
        throw new NotFoundError();
    }

    await formatResponse(ctx, {
        html: ctx => ctx.render('posts/show', {post}),
        htmx: ctx => ctx.render('posts/_post', {post, layout: false}),
        json: async ctx => ctx.body = JSON.stringify(post)
    })
}


/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.new = async (ctx, next) => {

    await formatResponse(ctx, {
        html: ctx => ctx.render('posts/new', {post: null}),
        htmx: ctx => ctx.render('posts/_form', {layout: false, form: {
            hxMethod: "hx-post",
            hxAction: `/posts?partial=true`,
            hxTarget: "this",
            hxSwap: "outerHTML"
        }, post: null})
    })
}

/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.edit = async (ctx, next) => {
    const post = await db('posts').select('*').where('id', ctx.params.id).first();

    if (!post) {
        throw new NotFoundError();
    }
    await formatResponse(ctx, {
        html: ctx => ctx.render('posts/edit', {post}),
        htmx: ctx => ctx.render('posts/_form', {post, layout: false, form: {
            id: `post-${post.id}`,
            hxMethod: "hx-put",
            hxAction: `/posts/${post.id}?partial=true`,
            hxTarget: "this",
            hxSwap: "outerHTML"
        }})
    })
}

/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.update = async (ctx, next) => {
    await db('posts').where('id', ctx.params.id).update({title: ctx.request.body.post.title, content: ctx.request.body.post.content});

    const post = await db('posts').select('*').where('id', ctx.params.id).first();

    
    await formatResponse(ctx, {
        html: ctx => ctx.render('posts/show', {post}),
        htmx: ctx => ctx.render('posts/_post', {post, layout: false}),
        json: async ctx => ctx.body = JSON.stringify(post)
    })
}

/**
 * 
 * @param {Context} ctx 
 * @param {Next} next 
 */
module.exports.create = async (ctx, next) => {
    const post = (await db('posts').insert({title: ctx.request.body.post.title, content: ctx.request.body.post.content}).returning("*"))[0];

    await formatResponse(ctx, {
        html: ctx =>{ ctx.request.method = "GET"; ctx.redirect(`/posts/${post.id}`) },
        htmx: ctx => {ctx.request.method = "GET"; ctx.redirect(`/posts/${post.id}?partial=true`) },
        json: async ctx => ctx.body = JSON.stringify(post)
    })
}




