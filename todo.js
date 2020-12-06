const toDoingForm = document.querySelector(".js-toDoWrite__Form"),
    toDoingInput = toDoingForm.querySelector("input"),
    toDoingBtn = document.querySelector(".js-doing"),
    toCompleteBtn = document.querySelector(".js-complete"),
    toDoList = document.querySelector(".js-toDoList");

const PENDING_LS = "PENDING",
    FINISHED_LS = "FINISHED",
    SHOWING_LS = "showing";

let toDosPending = [],
    toDosFinished = [],
    check = true,
    firstcheck = true;

function saveToDos(){
    localStorage.setItem(PENDING_LS, JSON.stringify(toDosPending));
    localStorage.setItem(FINISHED_LS, JSON.stringify(toDosFinished));
}

function delPending(e){
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDosPending = toDosPending.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
      });
    toDosPending = cleanToDosPending;
    saveToDos();
}

function moveFinihshed(e){
    delPending(e);
    saveFinished(e.target.parentNode.firstChild.innerText, -(toDosFinished.length+1));
}

function saveFinished(text, id){
    const toDoFinishedObj = {
        text,
        id
    }
    toDosFinished.push(toDoFinishedObj);
    saveToDos();
}

function savePending(text, id){
    const toDoPendingObj = {
        text,
        id
    }
    toDosPending.push(toDoPendingObj);
    saveToDos();
}

function delFinished(e){
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDosFinished = toDosFinished.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
      });
    toDosFinished = cleanToDosFinished;
    saveToDos();
}

function movePending(e){
    delFinished(e);
    savePending(e.target.parentNode.firstChild.innerText, (toDosPending.length+1));
}

function paintFinished(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = -(toDosFinished.length +1);
    delBtn.innerText = "✘";
    delBtn.addEventListener("click", delFinished);
    checkBtn.innerText = "◀︎";
    checkBtn.addEventListener("click", movePending);
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    toDoList.appendChild(li);
    saveFinished(text, newId);
}

function paintPending(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDosPending.length +1;
    delBtn.innerText = "✘";
    delBtn.addEventListener("click", delPending);
    checkBtn.innerText = "✔";
    checkBtn.addEventListener("click", moveFinihshed);
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    toDoList.appendChild(li);
    savePending(text, newId);
}

function loadDoing(){
    toCompleteBtn.classList.remove(SHOWING_LS);
    toDoingBtn.classList.add(SHOWING_LS);
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (firstcheck && loadedFinished !== null){
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function (toDo){
            saveFinished(toDo.text);
        })
        firstcheck = false
    }
    if (loadedPending !== null){
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function (toDo){
            paintPending(toDo.text);
        })
    }
}

function loadComplete(){
    toDoingBtn.classList.remove(SHOWING_LS);
    toCompleteBtn.classList.add(SHOWING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (loadedFinished !== null){
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function (toDo){
            paintFinished(toDo.text);
        })
    }
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = toDoingInput.value;
    if (check){
        paintPending(currentValue);
    }else{
        savePending(currentValue, toDosPending.length+1)
    }
    toDoingInput.value = "";
}

function handleDoing(e){
    check = true;
    toDosPending = [];
    while (toDoList.hasChildNodes()) { 
        toDoList.removeChild( toDoList.firstChild ); 
    }

    loadDoing();
}

function handleComplete(e){
    check = false;
    toDosFinished = [];
    while (toDoList.hasChildNodes()) { 
        toDoList.removeChild( toDoList.firstChild ); 
    }
    loadComplete();
}

function init(){
    loadDoing();
    toDoingForm.addEventListener("submit", handleSubmit);
    toDoingBtn.addEventListener("click", handleDoing);
    toCompleteBtn.addEventListener("click", handleComplete);
}

init();