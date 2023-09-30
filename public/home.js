//Javascript code for the nav bar
let toggleButton = document.getElementsByClassName('toggle-button')[0];
let navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
})

//Javascript code for the To do list
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');

//Event listener when enter is pressed on the keyboard
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length != 0){
        generateTemplate(todo);
        addForm.reset();
    }else{
        alert('Please input task');
    }
});

const generateTemplate = (todo) => {
    const html = `<li class='list-group-item d-flex justify-content-between align-items-center'>
        <span>${todo}</span>
        <a class="fa fa-trash-o delete">&#x1f5d1;</a>
    </li>`;
    list.innerHTML += html;
}

list.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
})