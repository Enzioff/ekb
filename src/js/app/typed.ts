import Typed from "typed.js"

class TypedAnimation {
    element: HTMLElement;
    strings;
    speed;
    
    constructor(element: HTMLElement) {
        this.element = element;
        this.strings = this.element.getAttribute("data-strings").trim().split(',')
        this.speed = this.element.getAttribute("data-speed") ? this.element.getAttribute("data-speed") : 100;
    
        this.init();
    }
    
    init() {
        new Typed(this.element, {
            strings: this.strings,
            typeSpeed: Number(this.speed),
            loop: true
        });
    }
}

export default TypedAnimation;
