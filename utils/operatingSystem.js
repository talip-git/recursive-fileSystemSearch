const getOperatingSystem = ()=>{
    const operatingSystem = process.platform
    if(operatingSystem === "linux"){
        return "/home"
    }
    else if(operatingSystem === "darwin"){
        return "/home"
    }
    else if(operatingSystem === "win32"){
        return "C://"
    }
    else{
        return "";
    }
}
module.exports = getOperatingSystem