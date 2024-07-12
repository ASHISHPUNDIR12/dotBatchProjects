const inputBox = document.getElementById("inputText");
const listContainer = document.getElementById("listContainer");
function addtask(){
    if(inputBox.value === ''){
        alert(" bruh write something 😑")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span  = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);    
    }
    inputBox.value = "";
    saveData();
}
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI" ){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false );

function saveData(){
    localStorage.setItem("data" , listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");

    
}
showTask();