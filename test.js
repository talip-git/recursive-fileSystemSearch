const search = require("./utils/search");
search()
.then(([directroyTree,defaultTree])=>{
    console.log(defaultTree);
})
.catch((err)=>{
    console.log(err)
})