const Post = require('./post');
const marked = require('marked');

module.exports = {


    async getAddForm(req, res) {
        console.log('getAddForm');

        res.marko(require('./views/form.marko'), { post:{}});
    },

    async getEditForm(req, res) {
        console.log('getEditForm');

        const messages = req.query.saved ? ['Post successfully saved!'] : [];

        try {
            const post = await Post.findById(req.params.id);
            res.marko(require('./views/form.marko'), { post, messages });
        } catch(err) {
            console.log(err);
            res.marko(require('./views/notfound'));
        }
        
        
    },

    async addPost(req, res) {
        
        console.log('addPost');
        const newPost = req.body;
        const oldPost = await Post
            .findOne({})
            .where('slug')
            .equals(newPost.slug);

        const formTemplate = require('./views/form.marko');

        if(oldPost) return res.marko(formTemplate, { 
            post: {},
            errors: ['Post slug already exists!']
        });

        newPost.private = newPost.private ? true : false;
        newPost.markedContent = marked(newPost.content);

        try {
            await Post.create(newPost);
            res.marko(formTemplate, { 
                post: {},
                messages: ['Post successfully added!']
            });

        } catch(err) {
            console.log(err);
            res.marko(formTemplate, { post: {}});
        }
    },

    async updatePost(req, res) {

        console.log('updatePost');

        const post = req.body;
        const postId = req.params.id;

        const oldPost = await Post
            .findOne({})
            .where('slug')
            .equals(post.slug)
            .ne('_id', postId);

        if(oldPost) return res.marko(require('./views/form.marko'), { 
            post,
            errors: ['Post slug already exists!']
        });

        await Post.findByIdAndUpdate(postId, post)
        res.redirect(`/post/form/${req.params.id}/?saved=true`);
    },

    async viewPost(req, res) {

        console.log('viewPost');

        const post = await Post
            .findOne({})
            .where('slug')
            .equals(req.params.slug);
    
        if(!post) return res.status(404).marko(require('./views/notfound.marko'));
        res.marko(require('./views/post.view.marko'), { post })

    },

    async getPosts(req, res) {
        const messages = req.query.removed ? ['Post successfully removed!'] : [];
        const posts = await Post.find({})
        res.marko(require('./views/posts.marko'), { posts, messages});
    },

    async removePost(req, res) {

        await Post.findOneAndRemove(req.params.id);
        res.redirect('/posts?removed=true');
    }
}