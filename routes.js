const Router = require('@koa/router');
const { bodyParser } = require('@koa/bodyparser');

const postsController = require('./controller/posts.controller');
const commentsController = require('./controller/comments.controller')
const { responseTypeMiddleware } = require('./middleware/responseType.middleware');
const { fixMethodMiddleware } = require('./middleware/fix-method.middleware');
const router = new Router();

router.use(bodyParser(),fixMethodMiddleware,responseTypeMiddleware);
router.get('/posts', postsController.all);
router.post('/posts', postsController.create);
router.get('/posts/new', postsController.new);
router.get('/posts/:id', postsController.show);
router.get('/posts/:id/edit', postsController.edit);
router.put('/posts/:id', postsController.update);
router.get('/posts/:postId/comments', commentsController.all);
router.post('/posts/:postId/comments', commentsController.create);





module.exports = router;

