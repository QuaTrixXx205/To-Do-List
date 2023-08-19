const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Add task
function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    } else {
        var li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        var span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        li.dataset.checked = "false";
        saveData();
    }
    inputBox.value = "";
}

// add event when user click a task, either done or remove it
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        e.target.dataset.checked = e.target.classList.contains("checked") ? "true" : "false";
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

// Save data after refresh browser
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");

    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        if (task.dataset.checked === "true") {
            task.classList.add("checked");
        }
    });
}
showTask();

// Add an event listener for the "Enter" key 
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask(); 
    }
});