const marked = require('marked');
const views = require('./views');
const service = require('./post-service');
const paginator = require('../base').paginator;

module.exports = {

    async getAddForm(req, res) {
        const messages = req.query.saved ? ['Post successfully saved!'] : [];        
        res.marko(views.form, { post: {}, messages});
    },

    async getEditForm(req, res) {

        const messages = req.query.saved ? ['Post successfully saved!'] : [];        
        const post = await service.findById(req.query._id);
        res.marko(views.form, { post, messages });
    
    },

    async addPost(req, res) {

        const post = req.body;
        post.private = post.private ? true : false;
        const result = await service.add(post);
        if(result.done) {
            res.redirect(`/admin/post/form/add/?saved=true`);
        } else {
            res.marko(views.form, { 
                post, 
                errors: result.messages
            });            
        }
    },

    async updatePost(req, res) {

        const post = req.body;
        const result = await service.update(post);
        if(result.done) {
             res.redirect(`/admin/post/form/edit/?_id=${post._id}&saved=true`);
        } else {
            res.marko(views.form, { 
                post,
                errors: result.messages
            });
        }
    },

    async viewPost(req, res) {

        const post = await service.findBySlug(req.params.slug);    
        if(!post) return res.status(404).marko(views.notfound);
        res.marko(views.postView, { post })

    },

    async getPosts(req, res) {

        const messages = req.query.removed ? ['Post successfully removed!'] : [];
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const total = await service.getNumberOfAllPosts();
        const posts = await service.getPosts(parseInt(page), parseInt(limit));
        res.marko(views.posts, { posts, messages, paginator: paginator(page, limit, total, '/admin/posts') });
    },

    async removePost(req, res) {

        await service.remove(req.query._id);
        res.redirect('/admin/posts?removed=true');
    }
}