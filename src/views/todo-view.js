import { LitElement, html } from "@polymer/lit-element";

const VisibilityFilters = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

class TodoView extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String },
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.filter = "";
    this.task = "";
  }

  addTodo() {
    if (this.task) {
      this.todos = [
        ...this.todos,
        {
          task: this.task,
          complete: false,
        },
      ];
    } else {
      alert("Input todo");
    }

    this.task = "";
  }

  updateTodo(todoTask) {
    this.todos = this.todos.map((todo) => {
      return todo.task === todoTask
        ? { ...todo, complete: !todo.complete }
        : todo;
    });
  }

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  filterChanged(e) {
    this.filter = e.target.value;
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.complete);
  }

  applyFilter(todos) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE: {
        const newTodos = todos.filter((todo) => !todo.complete);
        return newTodos;
      }

      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.complete);
      default:
        return todos;
    }
  }

  render() {
    return html`
      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px;
        }

        .input-layout {
          margin: 15px;
        }

        .task-input{
          height: 30px;
          border-radius: 5px;
          border: 1px solid #000;
        }


        .btn{
          height: 30px;
          border:none;
          color: #fff;
          border-radius: 5px;
        }
        
       .add-btn{
          background: #0275d8;
        }

        .clear-btn{
          background: #d9534f;
        
        }

        .visibility-input{
          margin: 10px;
        }

        .todo-list {
          margin: 15px;
        }

        .visibility-filters{
          margin: 15px;
        }


      </style>

      <div class="input-layout" @keyup="${this.shortcutListener}">
        <input
        class="task-input"
          placeholder="Task"
          .value="${this.task}"
          @input="${this.updateTask}"
        />
        <button class="btn add-btn" @click="${this.addTodo}">Add Todo</button>
      </div>

      ${
        this.applyFilter(this.todos).length === 0
          ? html`<p>No todos.</p>`
          : html` <div class="todo-list">
              ${this.applyFilter(this.todos).map(
                (todo) =>
                  html`<todo-item
                    .todo="${{ ...todo }}"
                    .updateTodo="${(todoTask) => {
                      this.updateTodo(todoTask);
                    }}"
                  ></todo-item>`
              )}
            </div>`
      }
      </div>

      <div class="visibility-filters">
        ${Object.values(VisibilityFilters).map((filter) => {
          return html`<span class="visibility-input">
            <input
              type="radio"
              name="visibility-filter"
              @change="${this.filterChanged}"
              ?checked="${filter === "All"}"
              value="${filter}"
            />${filter}
          </span>`;
        })}
      </div>

      <button class="btn clear-btn" @click="${this.clearCompleted}">
        Clear Completed
      </button>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("todo-view", TodoView);
