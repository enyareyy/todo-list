const input = document.querySelector(`#mainInput`)
const add = document.querySelector(`#add`)
const list = document.querySelector(`#list`)

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

function showData(arr){
    list.innerHTML=""
    if (arr.length === 0) {
    list.innerHTML = `<li class="list-group-item d-flex align-items-center">No todo</li>`; 
    return; 
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
            <button class="btn btn-outline-primary">
                <i class="bi bi-pen"></i> 
            </button>
            <button onclick="importantTodo(${todo.id})" class="btn btn-outline-warning">
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


