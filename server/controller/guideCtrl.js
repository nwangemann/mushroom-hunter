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
    },
    searchGuideByScientific: (req, res, next) => {
        const db = req.app.get('db')
        let {search_term} = req.params
        let search = '%' + search_term + '%'
        db.search_guide_by_scientific(search).then(searchResults => {
            res.status(200).send(searchResults)
        })
    },
    searchGuideByEdible: (req, res, next) => {
        const db = req.app.get('db')
        let {search_term} = req.params
        let search = '%' + search_term + '%'
        if(search_term === 'yes' || search_term === 'Yes'){
            search = '%' + 'Edible' + '%'
        } else if (search_term === 'no' || search_term === 'No'){
            search = '%' + "Poisonous" + '%'
        }
        db.search_guide_by_edible(search).then(searchResults => {
            res.status(200).send(searchResults)
        })
    },
    searchGuideBySeason: (req, res, next) => {
        const db = req.app.get('db')
        let {search_term} = req.params
        let search = '%' + search_term + '%'
        db.search_guide_by_season(search).then(searchResults => {
            res.status(200).send(searchResults)
        })
    }
}