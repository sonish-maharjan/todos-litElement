import { LitElement, html } from "@polymer/lit-element";

class TodoItem extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      todo: { type: Object },
    };
  }

  render() {
    return html`<div class="todo-item">
      <input
        type="checkbox"
        ?checked="${this.todo.complete}"
        @change="${(e) => {
          this.updateTodo(this.todo.index);
        }}"
      />
      ${this.todo.task}
      <!-- ${this.todo.complete} ${typeof this.todo.complete} -->
    </div> `;
  }
}

customElements.define("todo-item", TodoItem);
