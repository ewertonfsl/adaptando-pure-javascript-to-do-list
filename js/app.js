// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.


// Event handling, under interaction is what starts the code execution.
let taskInput = document.getElementById("new-task");//Add a new task.
let addButton = document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
let completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


// New task list item
let createNewTaskElement = function(taskString) {

	let listItem = document.createElement("li");

	let checkBox = document.createElement("input");
	let label = document.createElement("label");
	let editInput = document.createElement("input");
	let editButton = document.createElement("button");
	let editTooltip = document.createElement("span");
	let deleteButton = document.createElement("button");
	let deleteTooltip = document.createElement("span");

	label.innerText = taskString;

	//Each elements, needs appending
	checkBox.type = "checkbox";
	editInput.type = "text";

	// Modifica HTML dos elementos com a propriedades da DOM
	editInput.classList.add('editInput');
	editButton.className = "edit";
	editButton.innerHTML = '<i class="fa-solid fa-file-pen"></i>';
	editButton.classList.add('tooltip');
	deleteButton.className = "delete";
	deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
	deleteButton.classList.add('tooltip');

	editTooltip.innerText = "Editar";
	editTooltip.classList.add('tooltiptext');
	deleteTooltip.innerText = "Deletar";
	deleteTooltip.classList.add('tooltiptext');
	deleteTooltip.style.backgroundColor = "red";

	//and appending.
	editButton.appendChild(editTooltip);
	deleteButton.appendChild(deleteTooltip);
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	listItem.classList.add('item');
	
	return listItem;
}

let addTask = function() {
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	let listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit an existing task.
let editTask = function() {
	console.log("Edit Task...");
	console.log("Change 'edit' to 'save'");

	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type = text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
	let editTooltip = listItem.querySelector("span");

	//If class of the parent is .editmode
	if(containsClass) {
		//switch to .editmode
		//label becomes the inputs value.
		editTooltip.innerText = "Editar";
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
		editTooltip.innerText = "Salvar";
	}

	//toggle .editmode on the parent.
	listItem.classList.toggle("editMode");

	editInput.focus();
}


//Delete task.
let deleteTask = function() {
	console.log("Delete Task...");

	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	//Remove the parent list item from the ul.
	ul.removeChild(listItem);

}

//Mark task completed
let taskCompleted = function() {
	console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	let listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}

let taskIncomplete = function() {
	console.log("Incomplete Task...");
	
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incomplete-tasks.
	let listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}


//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;

let bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
	console.log("bind list item events");
	
	//select ListItems children
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");

	//Bind editTask to edit button.
	editButton.onclick = editTask;
	//Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask;
	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usabiliy don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Shange edit to save when you are in edit mode.    