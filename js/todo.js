//assigning the value stored in local storage to the list
let todoEvents = JSON.parse(localStorage.getItem('events')) || [{eventName: '', eventDate: '',
eventTime: ''}];

//renderTodos();

let renderDiv = document.getElementById('renderr-body');

const addButton = document.querySelector('.js-add');
addButton.addEventListener('click', () => {
  addEvents();
});

//add a listener to add events on pressing the enter key
document.body.addEventListener('keydown', (event)=> {
  if (event.key === 'Enter') {
    addEvents();
  }
});


function addEvents () {

// getting the event name datas of their input elements//
const eventElement = document.querySelector('.js-event');
const eventName = eventElement.value;

const eventDateElement = document.querySelector('.js-date');
const eventDate = eventDateElement.value;

const eventTimeElement = document.querySelector('.js-time');
const eventTime = eventTimeElement.value;

/*The property name is the same with variable name, so destructuring takes place*/
todoEvents.push ({eventName, eventDate, eventTime});

eventElement.value = '';
eventDateElement.value = '';
eventTimeElement.value = '';

renderTodos();
}


/* To display each events/Todos*/
function renderTodos () {
  renderDiv.hidden = false;
  renderDiv.classList.add('render-body')
  let todoList = '';

  /*using for loop cause looping starts from index 1*/
  for (let i = 1; i < todoEvents.length; i++) {
  const eventObject = todoEvents[i];
  
  /*const eventName = eventObject.eventName;
  const eventDate = eventObject.eventDate;
  const eventTime = eventObject.eventTime;*/

  const {eventName, eventDate, eventTime} = eventObject;

  /*generating an html elemnts for each the events/todos*/
  const eventsHtml = `
  <div id = "js-render" class="event-render">
    <div > ${i} &#8226; ${eventName}</div> 
    <div> ${eventDate}</div>
    <div> ${eventTime}</div>
    <button class ="js-remove css-remove">
      Remove
    </button>
  </div>
  `
  todoList += eventsHtml;
  }

  /*rendering our events/todos on the page*/
  
  renderDiv.innerHTML = `
  <h4> EVENTS DATABASE </h4>
  <div class = "css-render"> ${todoList} </div>
  `
  if (todoEvents.length > 2) {
    renderDiv.innerHTML = `
    <h4> EVENTS DATABASE </h4>
    <div class = "css-render"> ${todoList} </div>
    <button class = "css-clear js-clear" onclick = " clearTodo ()">
     clear 
    </button>`
  }

  //document.querySelector('.js-render').innerHTML = todoList;
  
  /* saving the datas more permanently to avoid loss of previouse datas*/
  localStorage.setItem('events', JSON.stringify(todoEvents))

  const removeButton = document.querySelectorAll('.js-remove');
  removeButton.forEach((removeBtn,index) => {
    removeBtn.addEventListener('click', () => {
    todoEvents.splice(index, 1);
    
    renderTodos();
  })
})

  return todoList;
}

  /* To clear our entire todos/events from the page*/
function clearTodo (todoList) {
 
  if (todoList !== '') {
  todoList = '';
  todoEvents = [{eventName: '', eventDate: '',
  eventTime: ''}];
  
}
  document.getElementById('js-render').innerHTML = todoList;
  

  let clearButton = document.querySelector('.js-clear');
  if (clearButton.innerHTML === 'clear')
  { clearButton.innerHTML = 'cleared';

  /*A timeout to reset the content of the reset button*/ 
  setTimeout(() => {
    clearButton.innerHTML = 'clear';
  }, 1000);} else 
  { clearButton.innerHTML = 'clear';}

  /* Removing the permanetly saved datas*/
  localStorage.removeItem('events')
  renderDiv.hidden = true;
};