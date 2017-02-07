const Post = require('./post');
const marked = require('marked');

module.exports = {
      
      getForm(req, res) {
            res.marko(require('./views/form.marko'));
      },

      addPost(req, res) {

            req.body.private = req.body.private ? true : false;
            req.body.markedContent = marked(req.body.content);

            Post.create(req.body)
                  .then(
                        post => res.marko(require('./views/form.marko')),
                        err => {
                              console.log(err);
                              res.marko(require('./views/form.marko'))
                        }
                  );
      },

      viewPost(req, res) {
            console.log(req.params.slug);
            Post.findOne({})
                  .where('slug').equals(req.params.slug)
                  .then(post => res.marko(require('./views/post.view.marko'), { post }))
      }
}