const { getRootPath } = require('../common');
const blogService = require('../services/blog');


const blogController = {
    create: (req, res) => {
        const {title, content, author_name, author_description} = req.body;
        
        if (title  && content && author_name && author_description) {
            if (req.files?.cover_image) {
                const cover_image = req.files.cover_image;
                console.log("cover_image",cover_image)
                const mineType = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!mineType.includes(cover_image.mimetype)) {
                    return res.json({
                        error: true,
                        body: {},
                        msg: 'cover image should be jpg/jpeg/png type'
                    });
                }
                const  uploadPath = getRootPath() + '/images/' + Date.now() + '.' + cover_image.mimetype.split('/')[1];
                const filePath = 'images/' + Date.now() + '.' +cover_image.mimetype.split('/')[1];
                cover_image.mv(uploadPath, function(err) {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    const payload = {title, cover_image: filePath ,content, author_name, author_description}
                    blogService.create(payload, (output) => {
                        res.json(output);
                    })
                  });
            } else {
                res.json({
                    error: true,
                    body: {},
                    msg: 'cover image is mandatory field'
                });
            }
        } else {
            res.json({
                error: true,
                body: {},
                msg: 'All fields are mandatory'
            });
        }
    },
    getListing: (req, res) => {
        blogService.getListing((output) => {
            res.json(output);
        })
    }
}
module.exports = blogController;