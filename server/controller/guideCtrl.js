module.exports = {
    getGuideSortName: (req, res, next) => {
        const db = req.app.get('db')
        db.get_guide_sort_name().then(guide => {
            res.status(200).send(guide)
        })
    },
    searchGuide: (req, res, next) => {
        const db = req.app.get('db')
        let {search_term} = req.params
        let search = '%' + search_term + '%'
        db.search_guide(search).then(searchResults => {
            res.status(200).send(searchResults)
        })
    }
}