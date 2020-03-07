module.exports = {
    getUserPosts: (req, res, next) => {
        let {user_id} = req.params
        const db = req.app.get("db");
        db.get_user_posts(user_id).then(posts => {
            res.status(200).send(posts)
        }).catch(err => console.log(err))
    },
    deletePost: (req, res, next) => {
        let {post_id} = req.params
        let {user_id} = req.body
        const db = req.app.get("db");
        db.delete_post(post_id, user_id).then(updatedPosts => {
            res.status(200).send(updatedPosts)
        }).catch(err => console.log(err))
    },
    createPost: (req, res, next) => {
        const db = req.app.get("db")
        let {user_id} = req.params
        const {species, loc_x, loc_y, edible, date, description, image_url} = req.body
        let newDate = date.split('T', 1)
        let newestDate = newDate[0]
        db.create_post(species, edible, newestDate, description, image_url, user_id, loc_x, loc_y).then(updatedPosts => {
            res.status(200).send(updatedPosts)
        })
    },
    editPost: (req, res, next) => {
        const db = req.app.get("db")
        let {post_id} = req.params
        const {species, loc_x, loc_y, edible, date, description, image_url} = req.body
        db.edit_post(species, loc_x, loc_y, edible, date, description, image_url, post_id).then(updatedPost => {
            res.status(200).send(updatedPost)
        })
    }, 
    getPostDetails: (req, res, next) => {
        const db = req.app.get('db')
        let {post_id} = req.params
        db.get_post(post_id).then(post => {
            res.status(200).send(post)
        })
    },
    getPostCoordinates: (req, res, next) => {
        const db = req.app.get('db')
        let {user_id} = req.params
        db.get_coordinates(user_id).then(coordinates => {
            res.status(200).send(coordinates)
        })
    }
}