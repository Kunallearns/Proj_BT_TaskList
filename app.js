//  Define UI vars - These are the UI variables we'll need
const form = document.querySelector("#task-form")
const taskInput = document.querySelector("#task")
const filter = document.querySelector("#filter")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")

//  function to load all event listners


loadEventListeners(); /* Load all event listners */


/* define LoadEventListener function */
function loadEventListeners() {

    /* 1 */
    document.addEventListener("DOMContentLoaded", getTasks)
    // DOM event listner : Load all previously existing DOM entries
    // DOMContent Loaded is an event that gets loaded after the DOM is created i.e. when the page gets loaded 

    /* 2 */
    form.addEventListener("submit", addTask)
    //  Add Task event

    /* 3 */
    taskList.addEventListener("click", removeTask)
    //  Remove task event  - each specific task by clicking on x icon
    // and remove it from local storage too

    /* 4 */
    clearBtn.addEventListener("click", clearTasks)
    //Remove the entire list by clicking on clear Tasks Button
    // and remove it from local storage too

    /* 5 */
    filter.addEventListener("keyup", filterTasks)
    //Filter the Task events 
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


        /*Additional note: the arguement 'taskInput.value' has been replaced by task because there is NO input value coming from user BUT only the task info which is already stored in LS' */
        li.appendChild(document.createTextNode(task))
        //  Create new link element - the delete 'X' icon at the end 
        const link = document.createElement("a")
        link.className = "delete-item secondary-content" /* Add class, dont use classList.add - would not work the intended way */
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


/* removeTask: remove task  Since they are multiple items and can be dynamic in nature if.e. they can be added as per user discretion, we'll havr to rely on event delegation and we need to use the event listener on parent UL with the class "taskList" itself  */
function removeTask(e) {
    console.log(e)
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove()
            /* This is being removed from the DOM through the above code. 
            parent of the parent is the LI item which needs to be wiped off when the click happens */


            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
            /* Remove from LS(Local storage) */
            /* there is no particular ID that can be passed as an argument for easy hooking, thus treating the very li that has been created above as the refrence point */


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
            // taskList.innerHTML = "" /* can do this or below - both work */

            //  but the while loop is faster: per the defination below, the loop would continue to work till there is s a first child of the taskList
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


    /*In below, you can use forEach because querySelectorAll returns a NodeList and not HTML collection and forEach() can be used on NodeList. The same would NOT be true for getElementsByClass or tag because that wouldve returned HTML collection and then you wouldve had to convert it to array first in order to apply forEach() */
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