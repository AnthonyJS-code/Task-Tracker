const listContainer = document.getElementById("listContainer")
const addBtn = document.getElementById("addtaskbtn")
const logOut = document.getElementById("logout")
const url = "/api/alltasks"
const cor = document.getElementById("cor")
const cont = document.getElementById("cont")
const updateTask = document.getElementById("updatetask")
const Did = document.getElementById("id")
const filterBtn = document.getElementById("filter")
const filterDiv = document.getElementById("filterD")
const present = document.getElementById("present")

document.addEventListener("DOMContentLoaded",()=>{
    fetchDataAndDisplay()
})

async function fetchDataAndDisplay(){
    data = await fetch(url)
    if(data.headers.get("Content-Type") === "text/html; charset=utf-8"){
        location.href = data.url
    }else{
        data = await data.json()
        data = data.data
        let color;
        let option;
        for(i of data){
            if(i.completed === true){
                color = "green"
                option = 'Done'
            }else{
                color = "red"
                option = "Mark Done"
            }
            htmlFormat = `
                <div class="tasks" id="${i._id}">
                        <h4>${i.task}</h4>
                        <span class="u">Update</span>
                        <span class="d">Delete</span>
                        <span style="color: ${color};" class="m">${option}</span>
                </div>
            `
            listContainer.innerHTML += htmlFormat
        }
        filterDiv.addEventListener("click",(e)=>{
            if(e.target.classList.contains("filters")){
                listContainer.innerHTML = ""
                let curr = e.target.innerText.toLowerCase()
                if(curr === 'completed'){
                    present.innerText = 'Completed Tasks'
                    for(i of data){
                        if(i.completed === true){
                            filteredHtmlFormat = `
                                <div class="tasks" id="${i._id}">
                                    <h4>${i.task}</h4>
                                    <span class="u">Update</span>
                                    <span class="d">Delete</span>
                                </div>`
                            listContainer.innerHTML += filteredHtmlFormat
                        } 
                    }
                    filterDiv.style.display = 'none'
                }else if(curr === 'pending'){
                    present.innerText = 'Pending Tasks'
                    for(i of data){
                        if(i.completed === false){
                            filteredHtmlFormat = `
                                <div class="tasks" id="${i._id}">
                                    <h4>${i.task}</h4>
                                    <span class="u">Update</span>
                                    <span class="d">Delete</span>
                                    <span style="color: red;" class="m">Mark Done</span>
                                </div>`
                            listContainer.innerHTML += filteredHtmlFormat
                        }
                        
                    }
                    filterDiv.style.display = 'none'

                }else{
                    location.reload()
                }
            }
        })
    }
}

addBtn.addEventListener("click",async()=>{
    data = await fetch("/api/newTask")
    location.href = data.url
})

listContainer.addEventListener("click",async (e)=>{
    if(e.target.classList.contains("u")){
        id = e.target.parentElement.id
        cont.style.display = 'none'
        cor.style.display = 'block'
        Did.value = id
        updateTask.value = e.target.parentElement.children[0].innerText
    }else if(e.target.classList.contains("d")){
        id = e.target.parentElement.id
        data = await fetch(`/api/deletetask/${id}`,
        {
            method:"DELETE"
        }
        )
        location.href = data.url
    }else if(e.target.classList.contains("m")){
        id = e.target.parentElement.id
        data = await fetch(`/api/updatetask/${id}`,
        {
            method:"PUT"
        }
        )
        location.href = data.url
    }
})

filterBtn.addEventListener("click",()=>{
    filterDiv.style.display = 'flex'
})


logOut.addEventListener("click",async ()=>{
    let data = await fetch("/api/logout")
    location.href = data.url
})



