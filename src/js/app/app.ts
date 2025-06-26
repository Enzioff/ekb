import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";
import Mask from "./mask";
import Header from "./header";
import Faq from "./faq";
import Tabs from "./tabs";
import DirectionMap from "./directionMap";

class App {
    constructor() {
        this.init();
    }
    
    init = () => {
        this.createSlider()
        this.createFancybox()
        this.createMask()
        this.createHeader()
        this.createFaqBlock()
        this.createTabs()
        this.createDirectionMap()
    }
    
    createDirectionMap = () => {
        const directionMap = document.querySelector('[data-map-container]');
        
        if (!directionMap) return
        
        new DirectionMap(directionMap);
    }
    
    createFaqBlock = () => {
        const faqBlock = document.querySelectorAll('.faq');
        
        if (!faqBlock) return;
        
        faqBlock.forEach(el => {
            new Faq(el);
        })
    }
    
    createTabs = () => {
        const tabContainers = document.querySelectorAll('[data-tabs]');
        
        if (!tabContainers) return;
        
        tabContainers.forEach(tabContainer => {
            new Tabs(tabContainer);
        })
    }
    
    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
    
    createFancybox = () => {
        const customCloseButton =
            `<button data-fancybox-close class="fancybox-btn" title="Закрыть">
               <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29293 4.00004L0.646484 1.35359L1.35359 0.646484L4.00004 3.29293L6.64648 0.646484L7.35359 1.35359L4.70714 4.00004L7.35359 6.64648L6.64648 7.35359L4.00004 4.70714L1.35359 7.35359L0.646484 6.64648L3.29293 4.00004Z" fill="current"/>
               </svg>
            </button>`
        
        Fancybox.bind('[data-fancybox]', {
            defaultType: 'inline',
            tpl: {
                closeButton: customCloseButton,
            },
        })
    }
    
    createMask = () => {
        new Mask();
    }
    
    createHeader = () => {
        const header = document.querySelector('.header');
        
        if (!header) return;
        
        new Header(header);
    }
}

export {App};



