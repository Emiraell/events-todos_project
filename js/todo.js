let todoArray = [{eventName: '', eventDate: '',
eventTime: ''}];

displayTodoEvents()

function getEvents () { 
  /*Getting the event properties out of their elements*/

  // getting the event name out of it's input value//
const eventElement = document.querySelector('.js-event')
const eventName = eventElement.value
// getting the event Date out of it's input value//
const eventDateElement = document.querySelector('.js-date')
const eventDate = eventDateElement.value
// getting the event Time out of it's input value//
const eventTimeElement = document.querySelector('.js-time')
const eventTime = eventTimeElement.value

//const displayLm = document.querySelector('.js-render')
//displayLm.innerHTML = eventName

/*The property name to be pushed to in the array and the value to 
be stored in it are of the same name, so destructuring takes place*/
todoArray.push ({eventName, eventDate, eventTime})
console.log(todoArray)
eventElement.value = '';
eventDateElement.value = '';
eventTimeElement.value = '';
displayTodoEvents()

}


/* To display each events*/

function displayTodoEvents () {
  let todoList = ''
for (let i = 1; i < todoArray.length; i++){
  /*Generating a html element for each todo/event*/
  const eventObject = todoArray[i]
  const eventName = eventObject.eventName
  const eventDate = eventObject.eventDate
  const eventTime = eventObject.eventTime
  const eventsHtml = ` <div class="event-render">
    <div > ${i}. ${eventName}</div> 
    <div> ${eventDate}</div> <div> ${eventTime}</div>
    <button class ="remove-btn" 
    onclick="todoArray.splice(${i}, 1)
  displayTodoEvents();
  ">
    Remove
  </button>
  </div>
  `
  todoList += eventsHtml
  }
  document.querySelector('.js-render').innerHTML = todoList
  return todoList
}

function clearTodo (todoList) {
  if (todoList !=='') { todoList = ''
  todoArray = [{eventName: '', eventDate: '',
  eventTime: ''}]}
  document.querySelector('.js-render').innerHTML = todoList
  
}
