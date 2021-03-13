const toDoForm = document.querySelector(".js-todoform"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todolist");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newID = toDos.length +1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newID
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function something(todo){
    paintToDo(todo,text);
}
function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(something);
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
  
init();