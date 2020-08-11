//  Define UI vars - These are the UI variables we'll need

/*To access the parent Form */
const form = document.querySelector("#task-form")
/*To access the new tasks being entered by the user */
const taskInput = document.querySelector("#task")
/*To access the Filter - user input */
const filter = document.querySelector("#filter")
/* To access the ul (newly added li elements) */
const taskList = document.querySelector(".collection")
/* To access the clear task button */
const clearBtn = document.querySelector(".clear-tasks")

//  function to load all event listners
loadEventListeners(); /* Load all event listners */


/* define LoadEventListener function */
function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks)

    form.addEventListener("submit", addTask)

    taskList.addEventListener("click", removeTask)

    clearBtn.addEventListener("click", clearTasks)

    filter.addEventListener("keyup", filterTasks)
}


//  get Tasks from LS(Local storage)
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach(function (task) {
        /* The below code block has been copied from add task */
        //  create  li element
        const li = document.createElement("li")
        //  Add a class
        li.className = "collection-item"
        //  create a text node and append to the li

        /* step 6 */

        li.appendChild(document.createTextNode(task))
        //  Create new link element - the delete 'X' icon at the end 
        const link = document.createElement("a")
        link.className = "delete-item secondary-content" /* Add className, dont use classList.add - would not work the intended way */
        link.innerHTML = '<i class ="fa fa-remove"></i>' /* Add icon html */
        li.appendChild(link) /* Add link to li */
        taskList.appendChild(li); /* Add li to variable taskInput above so that the list starts forming */

    })
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
    taskList.appendChild(li); /* Add li to variable taskInput above so that the list starts tasking intended shape */

    //  Store in Local Storage:
    storeTaskInLocalStorage(taskInput.value)

    taskInput.value = "" /* Clear Input to start afresh*/

    e.preventDefault()
}

//  Store Task in Local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* step 7: */

function removeTask(e) {
    console.log(e)
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove()
            /* step 8 */


            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
            /* Step 9 */


        }
    }
}

// Remove from LS

function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem)
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

/* clearBtn: Clear tasks button */
function clearTasks(e) {
    console.log(e)
    if (e.target.classList.contains("clear-tasks")) {
        if (confirm("Are you sure?")) {

            /* Step 10 */

            while (taskList.firstChild) {

                taskList.removeChild(taskList.firstChild)
            }

            //  Clear tasks from LS
            clearTasksFromLocalStorage()
        };
    }
}

function clearTasksFromLocalStorage() {
    localStorage.clear()
}

function filterTasks(e) {
    // console.log(e)
    const text = e.target.value.toLowerCase();

    //  The lowerCase() has been used to facilitate easy comparison

    /* Step 11 */
    let x = document.querySelectorAll(".collection-item")
    console.log(x)
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        console.log(task.firstChild)

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block"
            /* if IndexOf(text) != -1 i.e. the element has an index number and thus it exists */
        } else {
            task.style.display = "none"
        }
    })

}