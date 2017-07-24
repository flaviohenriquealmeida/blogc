const marked = require('marked');
const views = require('./views');
const service = require('./post-service');
const { paginator, getExceptionMessage } = require('../base');

function render(req, res, view, data) {
    data.user = req.user;
    res.marko(view, data);
}

module.exports = {

    async getAddForm(req, res) {
        const messages = req.query.saved ? ['Post successfully saved!'] : [];        
        render(req, res, views.form, { post: {}, messages});
    },

    async getEditForm(req, res) {
        const messages = req.query.saved ? ['Post successfully saved!'] : [];        
        const post = await service.findById(req.query._id);
        render(req, res, views.form, { post, messages });
    },

    async addPost(req, res) {
        const post = req.body;
        post.private = post.private ? true : false;
        
        try {
            await service.add(post);
            res.redirect(`/admin/post/form/add/?saved=true`);
        } catch(err) {
            render(req, res, views.form, {
                post, 
                errors: getExceptionMessage(err)
            }); 
        }
    },

    async updatePost(req, res) {
        try {
            const post = req.body;
            await service.update(post);
            res.redirect(`/admin/post/form/edit/?_id=${post._id}&saved=true`);
        } catch(err) {
            render(req, res, views.form, { 
                post,
                errors: getExceptionMessage(err)
            });
        }
    },

    async viewPost(req, res) {
        const post = await service.findBySlug(req.params.slug);    
        if(!post) return res.status(404).marko(views.notfound);
        render(req, res, views.postView, { post });
    },

    async getPosts(req, res) {
        const messages = req.query.removed ? ['Post successfully removed!'] : [];
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const total = await service.getNumberOfAllPosts();
        const posts = await service.getPosts(parseInt(page), parseInt(limit));
        render(req, res, views.posts,{ posts, messages, paginator: paginator(page, limit, total, '/admin/posts') });
    },

    async removePost(req, res) {
        await service.remove(req.query._id);
        res.redirect('/admin/posts?removed=true');
    }
}