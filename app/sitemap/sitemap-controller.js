const sm = require('sitemap');
const Post = require('../post').model;

module.exports = {

    getSitemap(req, res) {

        Post
            .find({})
            .where('private')
            .equals(false)
            .then(posts => 
                posts.map(post => ({ 
                    url: `/${post.slug}/`, 
                    changefreq: 'daily',
                }))
            )
            .then(urls => {

            sitemap = sm.createSitemap ({
                hostname: 'localhost:3000',
                cacheTime: 600000,        // 600 sec - cache purge period 
                urls
            }).toXML((err, xml) => {

                if(err) return res.status(500).end();
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
            
        });        
    }
}