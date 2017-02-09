const Post = require('./post');
const marked = require('marked');

module.exports = {

    // duas responsabilidades, dividir
    async getForm(req, res) {
        let post = {};
        if(req.params.id) post = await Post.findById(req.params.id);
        res.marko(require('./views/form.marko'), { post });
    },

    async addPost(req, res) {

        req.body.private = req.body.private ? true : false;
        req.body.markedContent = marked(req.body.content);
        const template = require('./views/form.marko');

        try {
            await Post.create(req.body);
            res.marko(template, { post: {}});
        } catch(err) {
            console.log(err);
            // enviar mensagem e erro
            res.marko(template, { post: {}});
        }
    },

    async updatePost(req, res) {
        
        await Post.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/post/form/${req.params.id}`);
    },

    async viewPost(req, res) {

        const post = await Post
            .findOne({})
            .where('slug')
            .equals(req.params.slug);
        
        const template = require('./views/post.view.marko');
        if(!post) return res.status(404).marko(template);
        res.marko(template, { post })

    },

    async getPosts(req, res) {

        const posts = await Post.find({})
        res.marko(require('./views/posts.marko'), { posts });
    }
}