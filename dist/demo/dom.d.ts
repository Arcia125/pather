export declare class ActionCheckbox {
    element: HTMLInputElement;
    constructor(selector: string, handler: (ev: Event) => void);
    onChange: (handler: (ev: Event) => void) => void;
}
export declare class ActionButton {
    element: HTMLButtonElement;
    constructor(selector: string, handler: (ev: MouseEvent) => void);
    onClick: (handler: (ev: MouseEvent) => void) => void;
}
