module.exports = {
    getUserPosts: (req, res, next) => {
        //id will be sent as a param, taken from the store through the this.props.user.user_id object and sent as an arguement when this function is invoked. 
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
        const {species, location, edible, date, description, image_url} = req.body
        db.create_post(species, location, edible, date, description, image_url, user_id).then(updatedPosts => {
            res.status(200).send(updatedPosts)
        })
    },
    editPost: (req, res, next) => {
        const db = req.app.get("db")
        let {post_id} = req.params
        const {species, location, edible, date, description, image_url, user_id} = req.body
        db.edit_post(species, location, edible, date, description, image_url, post_id, user_id).then(updatedPosts => {
            res.status(200).send(updatedPosts)
        })
    }
}