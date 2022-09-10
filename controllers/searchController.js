const search = require("../utils/search")
const searchController = async (req,res,next)=>{
    try {
        const [directroyTree,defaultTree] = await search(req.body.path)
        return res.status(200).json({directroyTree:directroyTree,defaultTree:defaultTree})
    } catch (error) {
        next(error)
    }
}
module.exports = searchController;