const addTask = document.querySelector(".add-task");
const parentTask = document.querySelector(".content-list");
let localStorageList = localStorage.getItem("list");
let modal = document.getElementById("modal");
let modalText = document.getElementById("myTextarea");
const buttonCloseModal = document.querySelector("dialog button");
let mainContentBody = document.querySelector("body");
addTask.addEventListener("click", addNewTask);


const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${day} ${month} ${year}`;
};



const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        document.getElementById('title').textContent = `  ${getCurrentDate()}  ${hours}:${minutes}:${seconds}`;
    };

    // Atualiza as horas a cada segundo
    setInterval(getCurrentTime, 1000);
    


let listTask = [];
let checkList = [];

function addNewTask(){
    const inputTask = document.querySelector(".input > input");
    listTask.push(inputTask.value); 
    inputTask.value =  "";
    updateLocalStorageTask();
    showTask();
    
    
};


function showTask() {
        let createTask = "";
        listTask.forEach((item, index) => {
    
            createTask = createTask +`
          <div class="item-list" id="check-list${index}">
            <ul>
                <li id="my-task${index}"><p>${item}</p></li>
            </ul> 
          
            <div class="button-item">
                <span><input type=checkbox id="check${index}" class="check" onclick="CheckButtonTask(${index})">&#10004;</span>
                <span><input type=checkbox id="delete${index}" class="delete" onclick="deleteButtonTask(${index})">&#10006;</span>
                <span><input type=checkbox id="edit${index}" class="edit" onclick="editButtonTask(${index})">&#9998;</span>
            </div>
          </div>    
     `                        
    
    });
    
                          
        parentTask.innerHTML = createTask;
   

};

function updatePage() {
	getCurrentTime()
    if (localStorageList)
        listTask = JSON.parse(localStorageList);
        showTask();

    
};

function  CheckButtonTask(e) {
    let checkButton = document.querySelector("#check"+`${e}`);
    let taskIsCheck = document.querySelector("#check-list"+`${e}`); 
    let taskCompleted = document.querySelector("#check-list"+`${e}`+" ul > li")  
    taskIsCheck.style.background = "#D9D9D9";
    taskCompleted.style.textDecoration = "none";
    taskIsCheck.style.border = "";
    if (checkButton.checked){
        saveCheckbuttonState(checkButton.id);
        taskIsCheck.style.background = "#93bf85";
        taskIsCheck.style.border = "2px solid none";
        taskCompleted.style.textDecoration = "line-through";     
    }

}

function deleteButtonTask(e){
    listTask.splice(e, 1);
    updateLocalStorageTask()
    showTask();
}

function editButtonTask(e) { 
    let editTask = document.querySelector("#my-task"+e+" p");
    modal.showModal()
    modal.style.display = "block";
    modal.classList.add("modal")
    mainContentBody.classList.add("modal-open")

    modal.focus();

    editTask.style.background = "#D9D9D9";
    
    console.log(editTask.textContent);

    modalText.value = editTask.textContent;
    buttonCloseModal.value = e;
    showTask();
       
}

buttonCloseModal.addEventListener("click", () => {
    console.log(buttonCloseModal.value + modalText.value)
    listTask[buttonCloseModal.value] = modalText.value;
    updateLocalStorageTask()
    modal.classList.remove("modal")
    mainContentBody.classList.remove("modal-open")
    modal.close();
    modal.style.display = "none";
    showTask();

})


function saveCheckbuttonState(e){
    console.log(e);
    saveState(e)
    let checkedButton = document.querySelectorAll("#"+e);
    checkedButton.forEach(item => {
        if(item) {
            localStorage.setItem(item.id, item.checked);
             
        }

        });    
    
};


function saveState(check) {
    checkList.push(check)
    
}

function updateLocalStorageTask() {

    return localStorageList = localStorage.setItem("list", JSON.stringify(listTask));

    
};

updatePage();



