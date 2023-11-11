export class ActionCheckbox {
  public element: HTMLInputElement;
  public constructor(selector: string, handler: (ev: Event) => void) {
    this.element = document.querySelector(selector) as HTMLInputElement;
    if (!this.element) {
      throw new Error(`missing button ${selector}`);
    }
    this.onChange(handler);
  }

  public onChange = (handler: (ev: Event) => void) => {
    this.element.addEventListener('change', handler);
  };
}
