function save_name()  {
    var name = document.forms["myForm"]["username"].value;
    find_userId(name);
}

function find_userId(name) {
    name.toString();
    var name = name.toLocaleLowerCase();
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then(data => {
        for (var i = 0; i < data.length; ++i) {
            var obj = data[i];
            var username = obj.username;
            console.log(username);
            if (name.localeCompare(username.toString().toLocaleLowerCase()) 
                == 0) {
                userId = obj.id.toString();
            }
        }
        find_tasks(userId);
    });
    
    event.preventDefault();
}

function getCompletedTasks(completed, completedTasks) {
    if (completed == true) {
        completedTasks += 1;
    }
    return completedTasks;
}

function getTodoTasks(completed, todoTasks) {
    if (completed == false) {
        todoTasks += 1;
    }
    return todoTasks;
}

function find_tasks(userId) {
    fetch("https://jsonplaceholder.typicode.com/users/"+userId+"/todos")
    .then((response) => response.json())
    .then(data => {
        var completedTasks = 0;
        var todoTasks = 0;
        var titles;
        var count = 0;
        for (var i = 0; i < data.length; ++i) {
            var obj = data[i];
            completed = obj.completed;
            taskId = obj.id;
            completedTasks = getCompletedTasks(completed, completedTasks);
            todoTasks = getTodoTasks(completed, todoTasks);
        }
        
        var result = document.getElementById("completed");
        result.innerHTML = "Number of tasks completed by the user: " +
            completedTasks;
        var result = document.getElementById("todo");
        result.innerHTML = "\n Number of tasks left todo for the user: " +
            todoTasks;
        var result = document.getElementById("titles");
        var titles = "";
        for (var i = 0; i < data.length; ++i) {
            var obj = data[i];
            completed = obj.completed;
            if (completed == false) {
                count++;
                titles += count + ". " + obj.title +"\n";
                result.innerText = "Open Tasks left for the user:\n\n" + 
                    titles;
            }
        } 
    });
}
module.exports = {
    getCompletedTasks,
    getTodoTasks,
}