// TODO: limite de number of pages
module.exports = (page, limit, total, url)  => {

        return {
            page, 
            limit, 
            pages: Math.ceil(total/limit),
            url
        }
}