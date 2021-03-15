import { LitElement, html } from "@polymer/lit-element";

class TodoItem extends LitElement {
  //styles

  static get properties() {
    return {
      todo: { type: Object },
      updateTodo: { type: Function },
    };
  }

  constructor() {
    super();

    this.todo = {};
    this.updateTodo = () => {};
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
