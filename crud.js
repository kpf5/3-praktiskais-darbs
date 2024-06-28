let todoes = JSON.parse(localStorage.getItem("message")) || []

function allData(){
    localStorage.setItem("message", JSON.stringify(todoes))
    let element = ""
    todoes.forEach(item => {
        element += `
        <tr>
            <td style="background-color:${item.check ? "#e8f3db" : ""}">
                <div class="checker">
                    <span><input type="checkbox" class="checkbox" ${item.check ? "checked" : ""} onClick="toggleCheck(${item.id})"> </span>${item.message}
                </div>
                <div class="actionButtons">
                    <button class="editBtn" onClick="editHandler(${item.id})">Edit</button>
                    <button class="deliteBtn" onClick="deleteHandler(${item.id})">Delete</button>
                </div>
            </td>
        </tr>
        `
    })
    const table = document.querySelector(".mytable")
    table.innerHTML = element
}

document.querySelector(".formSubmitter").addEventListener('submit', function handleSubmit(e){
    e.preventDefault()
    
    let messageAdderInput = document.querySelector(".messageAdder")
    let messageAdder = messageAdderInput.value

    const messageInput = document.querySelector(".Idstorar")
    const messageId = messageInput.value

    if (messageId) {
        const IdFinder = todoes.find(todo => todo.id == messageId)
        if (IdFinder) {
            IdFinder.message = messageAdder
        }
    } else {
        const newObj = { id: todoes.length + 1, message: messageAdder, check: false }
        todoes.push(newObj)
    }

    messageAdderInput.value = ""
    messageInput.value = ""
    document.querySelector(".addmessageButton").innerHTML = "Add Task"

    allData()
})

function editHandler(id) {
    const finder = todoes.find(todo => todo.id == id)
    if (finder) {
        document.querySelector(".messageAdder").value = finder.message
        document.querySelector(".addmessageButton").innerHTML = "Update Task"
        document.querySelector(".Idstorar").value = finder.id
    }
}

function deleteHandler(id) {
    todoes = todoes.filter(todo => todo.id != id)
    allData()
}

function toggleCheck(id) {
    const finder = todoes.find(todo => todo.id == id)
    if (finder) {
        finder.check = !finder.check
        localStorage.setItem('message', JSON.stringify(todoes))
    }
    allData()
}

allData()
