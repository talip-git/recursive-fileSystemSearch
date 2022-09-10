const result = document.querySelector(".result");

const createFileNode = ()=>{
    const li = document.createElement("li")
}

const app = ()=>{
    const button = document.querySelector(".searchInput_button")
    const fileSelector = document.querySelector("#filePath")
    button.addEventListener("click",()=>{
        const res = axios.post("/api/search")
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err);
        })
    })
}
app();