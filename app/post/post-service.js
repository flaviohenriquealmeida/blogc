const Post = require('./post');
const marked = require('marked');

module.exports = {

    async isSlug(slug) {

        const post =  await Post
            .findOne({})
            .where('slug')
            .equals(slug);

        return post ? true : false;
    },

    async isSlugfromDiferentPost(slug, id) {

        const post = await Post
            .findOne({})
            .where('slug')
            .equals(slug)
            .ne('_id', id);

        return post ? true : false;
    },

    async add(post) {

        if(await this.isSlug(post.slug)) {
            return { done: false, messages: ['Slug already exists!']};
        } else {
            post.markedContent = marked(post.content);
            await Post.create(post);
            return { done: true, messages: ['Post successfully added!']};
        }
    },

    async update(post) {

        if(await this.isSlugfromDiferentPost(post)) {
            return { done: false, messages: ['Slug already exists!']};
        } else {
            post.markedContent = marked(post.content);            
            await Post.findByIdAndUpdate(post._id, post)
            return { done: true, messages: ['Post updated!']};
        }
    }, 

    async remove(id) {
        
        return await Post.findOneAndRemove(id);
    },

    async findBySlug(slug) {

        return  await Post
            .findOne({})
            .where('slug')
            .equals(slug);
    },

    async findById(id) {

        return await Post.findById(id)
    },    

    async getPosts(page, limit) {
        
        return await Post
            .find({})
            .sort({ publishedIn: 'desc'})
            .skip(page*limit).limit(limit);
    },

    async getNumberOfAllPosts() {

        return await Post.count({});
    }

}   