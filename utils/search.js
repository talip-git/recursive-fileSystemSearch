const path = require("path")
const fs = require("fs")
const getOperatingSystem = require("./operatingSystem");
/*
      Author: @Talip-git
    - Recursively searches through the file system and returns the file and directory stats
    - This function is synchronous. We make it async by wrapping it up in a Promise
    - Does NOT searches symbolic links
    - Ignores the errors like "broken/corrupt directories & files", "permission problems"
*/
const searchFiles = (rootDir = "/",directroyTree = {},size = 0,defaultTree = [])=>{
    const files  = fs.readdirSync(rootDir)
    if(files === undefined || files.length<=0){
        return directroyTree;
    }
    else{
        if(directroyTree && Object.keys(directroyTree).length === 0 && Object.getPrototypeOf(directroyTree) === Object.prototype){
            directroyTree = {
                path:rootDir,
                type:"Directory",
                subdirs:[]
            }
        }
        files.forEach((fileName)=>{
            const pathtoFile = path.join(rootDir,fileName);
            try {
                const stats = fs.statSync(pathtoFile);
                if(stats.isDirectory() && !(stats.isSymbolicLink())){
                    directroyTree.subdirs.push({type:"Directory",path:pathtoFile,size:stats.size,subdirs:[]})
                    searchFiles(pathtoFile,directroyTree.subdirs[directroyTree.subdirs.length-1],size=size,defaultTree=defaultTree)
                }
                else{
                    if(stats.size >= size){
                        defaultTree.push({type:"File",path:pathtoFile,size:stats.size})
                        directroyTree.subdirs.push({type:"File",path:pathtoFile,size:stats.size});
                    }
                }   
            } catch (error) {
                return;
            }
        });
        return [directroyTree,defaultTree]
    }

}
/*
    Get The Operating System of The Host Device and start the search.+

*/
const search = (path)=>{
    const root = path ? path : getOperatingSystem();
    return new Promise((resolve,reject)=>{
        try {
            const [directroyTree,defaultTree] = searchFiles(root)
            directroyTree && defaultTree && resolve([directroyTree,defaultTree])
        } catch (error) {
            reject(error);
        }
    })
}

module.exports=search;