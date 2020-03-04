module.exports = {
    getGuideSortName: (req, res, next) => {
        const db = req.app.get('db')
        db.get_guide_sort_name().then(guide => {
            res.status(200).send(guide)
        })
    }
}