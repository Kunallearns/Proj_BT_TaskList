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
    //  Remove task event  - each specific task by clicking on x icon
    taskList.addEventListener("click", removeTask)

    //Remove the entire list by clicking on clear Tasks Button

    clearBtn.addEventListener("click", clearTasks)

    //Filter the Task events 
    filter.addEventListener("keyup", filterTasks)
}



/*  addTask: Add Task */
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



/* removeTask: remove task  Since they are multiple items and can be dynamic in nature if.e. they can be added as per user discretion, we'll havr to rely on event delegation and we need to use the event listener on parent UL with the class "taskList" itself  */
function removeTask(e) {
    console.log(e)
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove() /* parent of the parent is the LI item which needs to be wiped off when the click happens */

        }
    }
}



/* clearBtn: Clear tasks button */
function clearTasks(e) {
    console.log(e)
    if (e.target.classList.contains("clear-tasks")) {
        if (confirm("Are you sure?")) {
            // taskList.innerHTML = "" /* can do this or below - both work */

            //  but the wjile loop is faster: per the defination below, the loop would continue to work till there is s a first child of the taskList
            while (taskList.firstChild) {

                taskList.removeChild(taskList.firstChild)
            }

            //     console.log(e)
        };
    }
}


function filterTasks(e) {
    // console.log(e)
    const text = e.target.value.toLowerCase();




    /*In below, you can use forEach because querySelectorAll returns a NodeList and not HTML collection and forEach() can be used on NodeList. The same would NOT be true for getElementsByClass or tag because that wouldve returned HTML collection and then you wouldve had to convert it to array first in order to apply forEach() */
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block"

        } else {
            task.style.display = "none"
        }
    })

}