const userDiv = document.querySelector(".js-user"),
    userForm = userDiv.querySelector(".js-form"),
    userInput = userForm.querySelector("input"),
    greetingsDiv = document.querySelector(".js-greetings"),
    greetingsText = greetingsDiv.querySelector("h3"),
    jsToDo = document.querySelector(".js-toDo");
    

const USER_LS = "user",
    GREETINGS_LS = "greetings",
    USGR_LS = "usgr";

function askForName(){
    userDiv.classList.remove(USER_LS);
    userForm.addEventListener("submit", handleUserForm);
}

function loadUser(){
    loadedUser = localStorage.getItem(USER_LS);
    if (loadedUser === null){
        askForName();
    }else{
        paintGreetings(loadedUser);
    }
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
    text = '';
}

function paintGreetings(text){
    greetingsDiv.classList.remove(GREETINGS_LS);
    jsToDo.classList.remove(USGR_LS);
    userDiv.classList.add(USER_LS);
    greetingsText.innerHTML = `안녕하세요. ${text}님!`
}

function handleUserForm(e){
    e.preventDefault();
    const inputValue = userInput.value;
    paintGreetings(inputValue);
    saveName(inputValue);
}

function init(){
    loadUser();
}

init();