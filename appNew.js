// const form = document.querySelector("#task-form")
// const taskInput = document.querySelector("#task")
// const filter = document.querySelector("#filter")
// const tasklist = document.querySelector(".collection")
// const clearBtn = document.querySelector(".clear-tasks")

// loadEventListeners()

// function loadEventListeners() {
//     document.addEventListener("DOMContentLoaded", getTasks)
//     form.addEventListener("submit", addTask)
//     // filter.addEventListener("keyup", filterTasks)
//     // tasklist.addEventListener("click", removeTask)
//     // cleaarBtn.addEventListener("click", clearTasks)
// }

// function getTasks() {
//     /*Retrieving old tasks array from local storage */
//     let taskArr;
//     if (localStorage.getItem("tasks") !== null) {
//         taskArr = [];
//     } else {
//         taskArr = JSON.parse(localStorage.getItem("tasks"))
//     }
//     // /TO BE CONTD//

// }

// function addTask() {

//     if (taskInput.value === "") {
//         alert("Add a task")
//     }

//     let newItemLi = document.createElement("li")
//     newItemLi.className = "collection-item";

//     let newItemAdded = newItemLi.appendChild(document.createTextNode(taskInput.value))

//     tasklist.innerHTML = `<li>${newItemAdded}</li>`










// }

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task")
const filter = document.querySelector("#filter")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")

loadEventListeners()

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks)
    form.addEventListener("submit", addTask)

    taskList.addEventListener("click", removeTask)
    clearBtn.addEventListener("click", clearTasks)
    filter.addEventListener("keyup", filterTasks)
}

function getTasks() {
    let tasksStored;
    if (localStorage.getItem("tasksStored") === null) {
        tasksStored = []
    } else {
        tasksStored = JSON.parse(localStorage.getItem("tasksStored"))
    }

    /*Initial upload of the preExisting tasks from the local Storage */
    tasksStored.forEach(function (xTask) {
        let li = document.createElement("li")
        li.className = "collection-item"
        li.appendChild(document.createTextNode(xTask))

        let xlink = document.createElement("a")
        xlink.className = "delete-item secondary-content"
        xlink.innerHTML = `<i class="fa fa-remove"></i>`
        li.appendChild(xlink)
        taskList.appendChild(li)
    })
}

function addTask(e) {

    /*a Create a new li element for each new item */
    if (taskInput.value === "") {
        alert("Please enter a new task!")
    }

    let li = document.createElement("li")
    li.className = "collection-item"
    li.appendChild(document.createTextNode(taskInput.value))

    let xlink = document.createElement("a")
    xlink.className = "delete-item secondary-content"
    xlink.innerHTML = `<i class="fa fa-remove"></i>`
    li.appendChild(xlink)
    taskList.appendChild(li)

    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
    e.preventDefault()
}

/*b Add new Element to the local storage*/
function storeTaskInLocalStorage(xTask) {
    let tasksStored
    if (localStorage.getItem("tasksStored") === null) {
        tasksStored = []
    } else {
        tasksStored = JSON.parse(localStorage.getItem("tasksStored"))
    }

    tasksStored.push(xTask)

    localStorage.setItem("tasksStored", JSON.stringify(tasksStored))

}

function removeTask(e) {
    // console.log(e)
    // console.log(e.target.parentElement.classList)
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove() /*Targetting 'li' element here */

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(xTaskItem) {
    console.log(xTaskItem)
    let tasksStored
    if (localStorage.getItem("taskStored") === null) {
        tasksStored = []
    } else {
        tasksStored = JSON.parse(localStorage.getItem("tasksStored"))
    }

    tasksStored.forEach(function (xItem, index) {
        if (xTaskItem.textContent === xItem) {
            tasksStored.splice(index, 1)
        }
    });
    localStorage.setItem("tasksStored", JSON.stringify(tasksStored))

}

/*ClearBtn - clear task Button*/
function clearTasks(e) {
    console.log(e)
    if (e.target.classList.contains("clear-tasks")) {
        if (confirm("Are you Sure to delete ALL?")) {
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild)
            }
            clearTasksFromLocalStorage()
        }
    }
}

function clearTasksFromLocalStorage() {
    localStorage.clear()
}

/*
function filterTasks(e) {
    const text = e.target.value.toLowerCase()

    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        console.log(task.firstChild)

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block"
        } else {
            task.style.display = "none"
        }

    })

}
*/
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
            task.style.display = "block";
            /* if IndexOf(text) != -1 i.e. the element has an index number and thus it exists */
        } else {
            task.style.display = "none";
        }
    })

}