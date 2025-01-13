class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
    console.log(this._completed);
    console.log(this._total);
    console.log(todos);
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
