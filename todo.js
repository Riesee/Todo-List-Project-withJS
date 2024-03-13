// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");



eventListeners();
// getTodoToStorage();  BENİM YAPTIĞIM ÇALIŞIYOR İTEM EKLEME


function eventListeners(){ // Tüm event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    // todoList.addEventListener("click",deleteTodo) BENİM YAPTIĞIM ÇALIŞIYOR İTEM SİLME
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")){
        // Arayüzden Todoları Temizleme
        // todoList.innerHTML = ""; // Yavaş

        while (todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
            // Bulamadı

            listItem.setAttribute("style","display : none !important");
            console.log(filterValue);
        }
        else {
            listItem.setAttribute("style","display : flex !important")
        }
    })
}


function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarıyla Silindi...");
    }
}

function deleteTodoFromStorage(deleteTodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo){
            todos.splice(index,1); // arrayden değeri silme.
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));



}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
        
    });
}


function addTodo(e){
    const newTodo = todoInput.value.trim(); // trim baştaki ve sondaki boşlukları siliyo
    todos = getTodosFromStorage();
    lowerlist = []; // Ders dışında güncelleme ekledim aynı olan varsa tespit ediyor
    todos.forEach(todo => {
        todo = todo.toLowerCase();
        lowerlist.push(todo);
        
    });

    
    if ( lowerlist.indexOf(newTodo.toLowerCase()) != -1 ){
        showAlert("danger","Lütfen daha önce girilmemiş bir todo girin...");
        todoInput.value = "";
    }
    else{
        if(newTodo === ""){
            showAlert("danger","Lütfen bir todo girin...");
        }
        else{
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo);
            showAlert("success","Todo başarıyla eklendi...")
        } 
    }

    e.preventDefault();
}

function getTodosFromStorage(){ // Storageden bütün todoları almak
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

// ////////////////////////////////
/* BENİM YAPTIĞIM ÇALIŞIYOR İTEM EKLEME
function getTodoToStorage(){
    let todos = getTodosFromStorage();

    todos.forEach(element => {
        addTodoToUI(element);
    });
}
*/
/* BENİM YAPTIĞIM ÇALIŞIYOR İTEM SİLME
function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        let list = e.target.offsetParent
        todoList.removeChild(list)
        let todos = getTodosFromStorage()
        todos.forEach(element => {
            if (element === list.textContent){
                todos.splice(todos.indexOf(element),1)
                todos = JSON.stringify(todos);
                localStorage.setItem("todos",todos)
            }
        });
        e.preventDefault();
    }
}
*/
/* BENİM YAPTIĞIM ÇALIŞIYOR İTEM FİLTRELEME
function todoFilter(text){
    let value = text.target.value.toLowerCase();

    //todos = getTodosFromStorage();

    //filteredTodos = todos.filter(todo => todo.toLowerCase().includes(value))


    const liste = document.querySelectorAll(".list-group-item");

    // liste.forEach(e => {
    //     if (filteredTodos.indexOf(e.textContent) === -1){
    //         e.className = "list-group-item d-none justify-content-between"
    //     }
    //     else {
    //         e.className = "list-group-item d-flex justify-content-between"
    //     }
    // });

    //AŞAĞIDAKİLER HOCAYA UYARLANDI
    liste.forEach(e => {
        text = e.textContent.toLowerCase();
        if (text.indexOf(value) === -1){
            e.setAttribute("style","display : none !important");
        }
        else{
            e.setAttribute("style","display : flex !important");
        }
        
    });
}
 */
/* BENİM YAPTIĞIM ÇALIŞIYOR TÜM TASKLARI TEMİZLEYİN
function clearTodos(e){
    localStorage.removeItem("todos");
    while (todoList.hasChildNodes()){
        todoList.removeChild(todoList.firstChild);
    }

}
 */
// ////////////////////////////////

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
    
}


function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // console.log(alert);

    firstCardBody.appendChild(alert);

    // setTimeout

    setTimeout(function(){
        alert.remove();
    },1000);
}


function addTodoToUI(newTodo){ // String değerini list item olarak UI'a ekleyecek

    /* <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href = "#" class ="delete-item">
            <i class = "fa fa-remove"></i>
        </a>
    </li> */


    // List item Oluşturma
    const listItem = document.createElement("li");

    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';


    listItem.className = "list-group-item d-flex justify-content-between"


    // Text Node ( Todo 1) ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);



    // Todo List'e ( ul'ye ) List item'i ekleme

    todoList.appendChild(listItem);


    todoInput.value = "";

}

