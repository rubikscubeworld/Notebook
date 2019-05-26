const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

// Variables
let listData, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    listData = JSON.parse(data);
    id = listData.length; // set the id to the last one in the list
    loadList(listData); // load the list to the user interface
}else{
    // if data isn't empty
    listData = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
    window.location.href= "Landing Page.html";
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p contentEditable="true" class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        //Code 13 is the Enter Key
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            listData.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the listData array is updated)
            localStorage.setItem("TODO", JSON.stringify(listData));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    
    listData[element.id].done = listData[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    listData[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the listData array is updated)
    localStorage.setItem("TODO", JSON.stringify(listData));
});