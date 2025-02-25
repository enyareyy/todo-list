const input = document.querySelector(`#mainInput`)
const add = document.querySelector(`#add`)
const list = document.querySelector(`#list`)
const change = document.querySelector(`#change`)

let mainBtn=`add`
if(mainBtn===`add`){
    change.style.display = `block`
    add.style.display=`none`
}
if(mainBtn===`add`){
    add.style.display = `block`
    change.style.display=`none`
}


let data = []

add.onclick=(e)=>{
    e.preventDefault()
    console.log(`add work`);
    

    if(input.value.trim().length>0){
        const todoData={id:Math.random()*100, text:input.value, done:false, important:false}
        input.value=``
        data.push(todoData)
        console.log(todoData);
        showData(data)
        input.style.border=`1px solid black`
    } else {
        input.style.border=`1px solid red`
    }
}
if (data.length === 0) {
    list.innerHTML = `<h3 class="list-group-item d-flex align-items-center">No todo</h3>`;
}
function showData(arr){
    list.innerHTML=""
    if (arr.length === 0) {
    list.innerHTML = `<h3 class="list-group-item d-flex align-items-center">No todo</h3>`;
}
    for(const todo of arr){
        let clazz = ""
        let clazzImportant = ""
            if(todo.done){
                clazz+=`done`
            }
            if(todo.important){
                clazzImportant+=`important`
            }
        list.innerHTML+=`
        <li class="list-group-item d-flex align-items-center">
            <span onclick="doneTodo(${todo.id})" class="flex-grow-1 ${clazz} ${clazzImportant}">${todo.text}</span>
            <button onclick="delTodo(${todo.id}, event)" class="btn btn-outline-danger">
                <i class="bi bi-trash"></i> 
            </button>
            <button onclick="editTodo(${todo.id}, event)" class="btn btn-outline-primary">
                <i class="bi bi-pen"></i> 
            </button>
            <button onclick="importantTodo(${todo.id},)" class="btn btn-outline-warning">
                <i class="bi bi-exclamation-circle-fill"></i> 
            </button>
        </li>`;

    }
}


function delTodo(id, event){
    event.preventDefault()
    data = data.filter(todo => todo.id !== id);
    showData(data); 
    // console.log(data);
    
}

function doneTodo(id) {
    const element = data.find(el => el.id === id);
    let updElement = { ...element, done: !element.done };
    console.log(updElement);
    let index = data.findIndex(el => el.id === id);
    let before = data.slice(0, index);
    let after = data.slice(index + 1);  
    data = [...before, updElement, ...after];
    showData(data);
}


function importantTodo(id) {
    const element = data.find(el => el.id === id);
    let updElement = { ...element, important: !element.important };
    console.log(updElement);
    let index = data.findIndex(el => el.id === id);
    let before = data.slice(0, index); 
    let after = data.slice(index + 1);  
    data = [...before, updElement, ...after];
    showData(data);
}

function editTodo(id, event){
    event.preventDefault()
    const upData = data.find(el=>el.id===id)
    console.log(upData.text);
    input.value=upData.text
    if(mainBtn===`add`){
        change.style.display = `block`
        add.style.display=`none`
    }
    change.onclick=(e)=>{
        e.preventDefault()
        const newTodo={...upData, text:input.value}
        let index=data.findIndex(el=>el.id===id)
        let before=data.slice(0, index)
        let after = data.slice(index+1)
        data=[...before, newTodo, ...after]
        showData(data)
        input.value=``
        let mainBtn=`add`
        if(mainBtn===`add`){
            add.style.display=`block`
            change.style.display=`none`
        }
    }
}

const all = document.querySelector(`#all`)
const idDone = document.querySelector(`#idDone`)
const active = document.querySelector(`#active`)

all.onclick=(e)=>{
    all.style.background = `blue`
    idDone.style.background = `none`
    active.style.background = `none`

    all.style.color=`white`
    idDone.style.color = `grey`
    active.style.color = `grey`
    showData(data)
    
}

idDone.onclick=(e)=>{
    e.preventDefault()
    console.log(`id done work`);
    let doneToDo= data.filter(todo =>todo.done===true)
        // console.log(data);
        idDone.style.background = `blue`
        all.style.background = `none`
        active.style.background = `none`

        all.style.color=`grey`
        idDone.style.color = `white`
        active.style.color = `grey`
        if (data.length === 0) {
            list.innerHTML = `<h3 class="list-group-item d-flex align-items-center">No todo</h3>`;
        }
        showData(doneToDo)
}


active.onclick=(e)=>{
    e.preventDefault()
    console.log(`active work`);

    let doneFalse = data.filter(todo=>todo.done===false)
    // console.log(data);
    active.style.background = `blue`
    all.style.background = `none`
    idDone.style.background = `none`

    all.style.color=`grey`
    idDone.style.color = `grey`
    active.style.color = `white`
    if (data.length === 0) {
        list.innerHTML = `<h3 class="list-group-item d-flex align-items-center">No todo</h3>`;
    }
    showData(doneFalse)
    
}
