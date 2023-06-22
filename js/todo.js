let todoEvents = [{eventName: '', eventDate: '',
eventTime: ''}];

//displayTodoEvents();

function getEvents () { 
  /*Getting the event properties out of their elements*/


  // getting the event name out of it's input value//
const eventElement = document.querySelector('.js-event');
const eventName = eventElement.value;

// getting the event Date out of it's input value//
const eventDateElement = document.querySelector('.js-date');
const eventDate = eventDateElement.value;

// getting the event Time out of it's input value//
const eventTimeElement = document.querySelector('.js-time');
const eventTime = eventTimeElement.value;

//const displayLm = document.querySelector('.js-render')
//displayLm.innerHTML = eventName

/*The property name to be pushed to in the array and the value to 
be stored in it are of the same name, so destructuring takes place*/

todoEvents.push ({eventName, eventDate, eventTime});
/*console.log(todoEvents)*/

//resetting the input elements back to it default value
eventElement.value = '';
eventDateElement.value = '';
eventTimeElement.value = '';
displayTodoEvents();

}


/* To display each events/Todos*/

function displayTodoEvents () {
  let todoList = '';
for (let i = 1; i < todoEvents.length; i++){
  
  /*Generating a html element for each todo/event*/

  const eventObject = todoEvents[i];
  const eventName = eventObject.eventName;
  const eventDate = eventObject.eventDate;
  const eventTime = eventObject.eventTime;

  /*creating/generating an html elemnts for each 
  the events/todos*/

  const eventsHtml = `
  <div class="event-render">
    <div > ${i}. ${eventName}</div> 
    <div> ${eventDate}</div>
    <div> ${eventTime}</div>
    <button class ="remove-btn" 
    onclick =
    "todoEvents.splice(${i}, 1)
    displayTodoEvents();">
      Remove
    </button>
  </div>
  `
  todoList += eventsHtml;
  }

  /*rendering our events/todos on the page*/
  document.querySelector('.js-render').innerHTML = todoList;

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
}