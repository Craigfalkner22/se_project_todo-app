import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../componets/Todo.js";
import FormValidator from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import TodoCounter from "../componets/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSumbit: (inputValues) => {
    const valuesWithId = { ...inputValues, id: uuidv4() };
    renderTodo(valuesWithId);
    addTodoPopup.close();
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete() {
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: (data) => {
    renderTodo(data);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
