//assigning the value stored in local storage to the list
let todoEvents = JSON.parse(localStorage.getItem('events')) || [{eventName: '', eventDate: '',
eventTime: ''}];

let renderDiv = document.getElementById('renderEvents');

renderTodos();

if (todoEvents.length < 2) {
renderDiv.hidden = true;
}

//add listeners
const addButton = document.querySelector('.js-add');
addButton.addEventListener('click', () => {
  addEvents();
});

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

renderTodos ();
}


/* To display each events/Todos*/
function renderTodos () {
  renderDiv.hidden = false;
  renderDiv.classList.add('render-body');
  let todoList = '';

  /*using for loop cause looping starts from index 1*/
  for (let i = 1; i < todoEvents.length; i++) {
  const eventObject = todoEvents[i];
  const {eventName, eventDate, eventTime} = eventObject;

  /*generating an html elemnts for each the events/todos*/
  const eventsHtml = `
  <div id = "js-render" class="eventRender">
    <div class = "eventNamediv"> 
      ${i}&#8226; ${eventName} 
    </div> 
    <div> ${eventDate}</div>
    <div> ${eventTime}</div>
    <button class ="js-remove removeBtns">
      Remove
    </button>
  </div>
  `;

  todoList += eventsHtml;
  }

  /*rendering our events/todos on the page*/
  renderDiv.innerHTML = `
  <h4> EVENTS DATABASE </h4>
  <div class = "todoRender"> ${todoList} </div>
  `
  if (todoEvents.length > 2) {
    renderDiv.innerHTML += `
    <button class = "clearAll js-clearAll" onclick = "
      todoEvents = [
        {eventName: '', eventDate: '', eventTime: ''}
      ];
      renderTodos ();
      timeOut(); ">
      clear All
    </button>
    <button class = "clearBtn js-clear" onclick = "clearTodo ()">
     clear 
    </button>
    `;
  }

  //remove button listners and functionality
  const removeButton = document.querySelectorAll('.js-remove');  
  removeButton.forEach((removeBtn, index) => {
  removeBtn.addEventListener('click', () => {
    todoEvents.splice(index + 1, 1);
    renderTodos();
    
    if (todoEvents.length < 2) {
      timeOut ();
    }  
  }) 
});
  
  /* saving the datas more permanently to avoid loss of previouse datas*/
  localStorage.setItem('events', JSON.stringify(todoEvents))

  return todoList;
}

/* To clear our entire todos/events from the page*/
let intervalId; 
function clearTodo (todoList)  {
  
  if (todoEvents.length > 1 && todoList !== '') {

    document.querySelector('.js-clear').innerHTML = 'clearing';  
    intervalId = setInterval (() => {
      todoEvents.splice(-1, 1);
      renderTodos ();
      
      if (todoEvents.length < 2) {
        timeOut ()
      }

      renderDiv.innerHTML += `
      <button id = "stopClearing" class = "stopclearBtn" onclick = "
        clearInterval(intervalId);
        document.querySelector('.js-clear').innerHTML = 'clear';
        document.getElementById('stopClearing').innerHTML = 'stopped'; ">
          stop 
      </button>`;
    }, 800)
   
  } else {
    clearInterval(intervalId);
    renderTodos ();
    document.querySelector('.js-clear').innerHTML = 'clear'
} 

}
  
const timeOut = () => {
  
   setTimeout(() => {
    clearInterval(intervalId);
    renderDiv.hidden = true;
    todoEvents = [
      {eventName: '', eventDate: '', eventTime: ''}
    ];
  },1500);

}