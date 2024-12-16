let themeToggle = document.getElementById('themeToggle');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<span class="material-icons">light_mode</span>';
    } else {
        themeToggle.innerHTML = '<span class="material-icons">dark_mode</span>';
    }
});





function renderTodos() {
    let todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        todoList.innerHTML += `
            <div class="todo-item">
                <div class="checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${todo.id})"></div>
                <div class="todo-text ${todo.completed ? 'completed' : ''}">${todo.title}</div>
                <div class="todo-actions">
                <button onclick="editTodo(${todo.id})">
                        <span class="material-icons">edit</span>
                    </button>
                    <button onclick="deleteTodo(${todo.id})">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </div>
        `;
    });
}

function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        saveTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    saveTodos();
}

let searchInput = document.getElementById('searchInput');
let sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
    let todoTitle = searchInput.value;
    if (todoTitle.trim() !== '') {
        todos.push({
            id: todos.length + 1,
            title: todoTitle,
            completed: false,
        });
        searchInput.value = '';
        renderTodos();
        saveTodos();
    } else {
        alert('Please enter a note.');
    }
});

    
renderTodos();
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const newTitle = prompt('Enter the new title:', todo.title);
        if (newTitle) {
            todo.title = newTitle;
            renderTodos();
            saveTodos();
        }
    }
}



