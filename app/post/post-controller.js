const Post = require('./post');
const marked = require('marked');
const views = require('./views');

module.exports = {

    async getAddForm(req, res) {

        res.marko(views.form, { post:{}});
    },

    async getEditForm(req, res) {

        const messages = req.query.saved ? ['Post successfully saved!'] : [];

        try {
            const post = await Post.findById(req.query._id);
            res.marko(views.form, { post, messages });
        } catch(err) {
            console.log(err);
            res.marko(views.form);
        }
        
        
    },

    async addPost(req, res) {
        
        const newPost = req.body;
        const oldPost = await Post
            .findOne({})
            .where('slug')
            .equals(newPost.slug);

        if(oldPost) return res.marko(views.form, { 
            post: {},
            errors: ['Post slug already exists!']
        });

        newPost.private = newPost.private ? true : false;
        newPost.markedContent = marked(newPost.content);

        try {
            await Post.create(newPost);
            res.marko(views.form, { 
                post: {},
                messages: ['Post successfully added!']
            });

        } catch(err) {
            console.log(err);
            res.marko(views.form, { post: {}});
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

        if(oldPost) return res.marko(views.form, { 
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
    
        if(!post) return res.status(404).marko(views.notfound);
        res.marko(views.postView, { post })

    },

    async getPosts(req, res) {
        const messages = req.query.removed ? ['Post successfully removed!'] : [];
        const posts = await Post.find({}).sort({ publishedIn: 'desc'});
        res.marko(views.posts, { posts, messages});
    },

    async removePost(req, res) {

        await Post.findOneAndRemove(req.query._id);
        res.redirect('/posts?removed=true');
    }
}