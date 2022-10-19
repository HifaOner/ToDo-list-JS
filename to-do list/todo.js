// TÜM ELEMENLERİ SEÇME


const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){  // Tüm event listenerlar
    
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if (confirm("Are you sure you want to delete all?")){
           // todoList.innerHTML = ""; // Yavaş Yöntem

           while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
           }
           localStorage.removeItem("todos");
        }

}


function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display :block");
        }
    });
}


function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Succesfully Deleted");
    }


function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // Array den değer silme
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));


}



}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === ""){

    
        showAlert("danger","Place Write an To-Do");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","Succesfully Added");
    }
  

    
   e.preventDefault();
       
}
function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));



}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);
    
    // setTimeout = saniye ekleme (milisaniye bazında)

    setTimeout (function(){
        alert.remove();
    },4000);
}


function addTodoToUI(newTodo){ // string değeri list item olarak ekleyecek

// List İtem OLUŞTURMA
const listItem = document.createElement("li");

// LİNK OLUŞTURMA

const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>"

listItem.className = "list-group-item d-flex justify-content-between";

// Text Node Ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

// Todo Liste List Item Ekleme

todoList.appendChild(listItem);
todoInput.value = "";



}


