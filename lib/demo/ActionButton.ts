export class ActionButton {
  public element: HTMLButtonElement;
  public constructor(selector: string, handler: (ev: MouseEvent) => void) {
    this.element = document.querySelector(selector) as HTMLButtonElement;
    if (!this.element) {
      throw new Error(`missing button ${selector}`);
    }
    this.onClick(handler);
  }

  public onClick = (handler: (ev: MouseEvent) => void) => {
    this.element.addEventListener('click', handler);
  };
}
