const mongoose = require('mongoose');
const Blog = mongoose.model('Blog')


const blogService = {
    create: async function (payload, cb) {
        try {
            const generatedSlugResult = await this.generateSlug(payload.title);
            const blog = await Blog();
            blog.title = payload.title;
            blog.slug = generatedSlugResult;
            blog.cover_image = payload.cover_image;
            blog.content = payload.content;
            blog.author_name = payload.author_name;
            blog.author_description = payload.author_description;
            const result = await blog.save();
            cb({
                error: false,
                body: result,
                msg: 'blog successfully inserted'
            });
        } catch (err) {
            cb({
                error: false,
                body: {},
                msg: err.message
            });
        }
    },
    generateSlug: function (value) {
        return new Promise( async (resolve) => {
            const slugValue = value.split(' ').join('-');
            const result = await Blog.find({ slug: `${slugValue}` });
            if (result.length) {
                resolve(`${slugValue}-${Date.now()}`)
            } else {
                resolve(`${slugValue}`)
            }
        })
    },
    getListing: async function (cb) {
        try {
            const result = await Blog.find({});
            cb({
                error: false,
                body: result,
                msg: "success"
            });
        } catch (err) {
            cb({
                error: false,
                body: {},
                msg: err.message
            });
        }
    }
}
module.exports = blogService;