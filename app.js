//  Define UI vars - These are the UI variables we'll need
const form = document.querySelector("#task-form")
const taskInput = document.querySelector("#task")
const filter = document.querySelector("#filter")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")

//  function to load all event listners

loadEventListeners();

/* define LoadEventListener function */
function loadEventListeners() {
    //  Add Task event
    form.addEventListener("submit", addTask)
}
//  Add Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("add a task")
    }


    //  create  li element

    const li = document.createElement("li")
    //  Add a class
    li.className = "collection-item"
    //  create a text node and append to the li

    li.appendChild(document.createTextNode(taskInput.value))
    //  Create new link element - the delete 'X' icon at the end 
    const link = document.createElement("a")
    link.className = "delete-item secondary-content" /* Add class, dont use classList.add - would not work the intended way */
    link.innerHTML = '<i class ="fa fa-remove"></i>' /* Add icon html */
    li.appendChild(link) /* Add link to li */
    taskList.appendChild(li) /* Add li to variable taskInput above so that the list starts forming */
    taskInput.value = "" /* Clear Input */

    e.preventDefault()
}