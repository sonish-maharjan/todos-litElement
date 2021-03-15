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
        .checked=${this.todo.complete}
        @change="${(e) => {
          this.updateTodo(this.todo.id);
        }}"
      />
      ${this.todo.task}
    </div> `;
  }
}

customElements.define("todo-item", TodoItem);
