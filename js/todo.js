//assigning the value stored in local storage to the list
let todoEvents = JSON.parse(localStorage.getItem('events')) || [{eventName: '', eventDate: '',
eventTime: ''}];

displayTodoEvents();

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

//clear button listener
document.querySelector('.js-clear').addEventListener(
  'click', () => {
    clearTodo();
  }
);
function addEvents () {

// getting the event name out of it's input value//
const eventElement = document.querySelector('.js-event');
const eventName = eventElement.value;

// getting the event Date out of it's input value//
const eventDateElement = document.querySelector('.js-date');
const eventDate = eventDateElement.value;

// getting the event Time out of it's input value//
const eventTimeElement = document.querySelector('.js-time');
const eventTime = eventTimeElement.value;

/*The property name is the same with variable name, so destructuring takes place*/
todoEvents.push ({eventName, eventDate, eventTime});
/*console.log(todoEvents)*/

eventElement.value = '';
eventDateElement.value = '';
eventTimeElement.value = '';

displayTodoEvents();
}

/* To display each events/Todos*/
function displayTodoEvents () {
  let todoList = '';

  /*using for loop instead of for each cause looping 
  starts from index 1*/
  for (let i = 1; i < todoEvents.length; i++){
  const eventObject = todoEvents[i];
  
  /*const eventName = eventObject.eventName;
  const eventDate = eventObject.eventDate;
  const eventTime = eventObject.eventTime;*/

  const {eventName, eventDate, eventTime} = eventObject;

  /*creating/generating an html elemnts for each 
  the events/todos*/
  const eventsHtml = `
  <div class="event-render">
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
  document.querySelector('.js-render').innerHTML = todoList;
  
  
  /* saving the events/todo more permanently on local storage
  i.e arrays retain previous todos even on refreshing the page*/
  localStorage.setItem('events', JSON.stringify(todoEvents))

  const removeButton = document.querySelectorAll('.js-remove');
  removeButton.forEach((removeBtn,index) => {
    removeBtn.addEventListener('click', () => {
    todoEvents.splice(index, 1)
    displayTodoEvents();
  })
})

  return todoList;
}


function clearTodo (todoList) {

  /* To clear our entire todos/events from the page*/
  if (todoList !=='') {
  todoList = '';
  todoEvents = [{eventName: '', eventDate: '',
  eventTime: ''}];
}
  document.querySelector('.js-render').innerHTML = todoList;

  /* Get the content of the clear button 
and worked on it to tell user they performed an action */
  let clearButton = document.querySelector('.js-clear');
  if (clearButton.innerHTML === 'clear')
  { clearButton.innerHTML = 'cleared';

  /*A timeout to reset the content of the reset button*/ 
  setTimeout(() => {
    clearButton.innerHTML = 'clear';
  }, 1000);} else 
  { clearButton.innerHTML = 'clear';}

  /* Removing the permanetly saved value 
  from local storage*/
  localStorage.removeItem('events')
}
