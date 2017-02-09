const Post = require('./post');
const marked = require('marked');

module.exports = {

    getForm(req, res) {

        if(req.params.id) {
            Post
                .findById(req.params.id)
                .then(post => res.marko(require('./views/form.marko'), { post }));
            } else {
                res.marko(require('./views/form.marko'), { post: {}});
        }
    },

    addPost(req, res) {

        req.body.private = req.body.private ? true : false;
        req.body.markedContent = marked(req.body.content);

        Post.create(req.body)
            .then(
                post => res.marko(require('./views/form.marko'), { post: {}}),
                err => {
                    console.log(err);
                    res.marko(require('./views/form.marko'), { post: {}});
                }
            );
    },

    updatePost(req, res) {
        
        Post.findByIdAndUpdate(req.params.id, req.body)
        .then(post => res.redirect(`/post/form/${req.params.id}`))
    },

    viewPost(req, res) {

        Post.findOne({})
        .where('slug').equals(req.params.slug)
        .then(post => {
            if(!post) return res.status(404).marko(require('./views/notfound.marko'));
            res.marko(require('./views/post.view.marko'), { post })
        });
    },

    getPosts(req, res) {

        Post.find({})
            .then(posts => res.marko(require('./views/posts.marko'), { posts }));
    }
}