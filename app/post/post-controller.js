const Post = require('./post');
const marked = require('marked');

module.exports = {

    async getAddForm(req, res) {

        res.marko(require('./views/form.marko'), { post:{}});
    },

    async getEditForm(req, res) {

        const messages = req.query.saved ? ['Post successfully saved!'] : [];

        try {
            const post = await Post.findById(req.query._id);
            res.marko(require('./views/form.marko'), { post, messages });
        } catch(err) {
            console.log(err);
            res.marko(require('./views/notfound'));
        }
        
        
    },

    async addPost(req, res) {
        
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
        console.log('chamou update');
        const post = req.body;
        const oldPost = await Post
            .findOne({})
            .where('slug')
            .equals(post.slug)
            .ne('_id', post._id);

        if(oldPost) return res.marko(require('./views/form.marko'), { 
            post,
            errors: ['Post slug already exists!']
        });

        await Post.findByIdAndUpdate(post._id, post)
        res.redirect(`/post/form/edit/?_id=${post._id}&saved=true`);
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
        const posts = await Post.find({}).sort({ publishedIn: 'desc'});
        res.marko(require('./views/posts.marko'), { posts, messages});
    },

    async removePost(req, res) {

        await Post.findOneAndRemove(req.query._id);
        res.redirect('/posts?removed=true');
    }
}