import { MessageDelimiter } from "./message-delimiters";

export class MessageSegmentField {
    
    constructor( public text:string, delimiters:MessageDelimiter ) {
        this.loadFieldComponents(delimiters);
    }

    loadFieldComponents(delimiters:MessageDelimiter) {
        let i:number = 0;        
        this.text.split(delimiters.componentSeperator).forEach( raw => {
                        this[i++] = new MessageSegmentFieldComponent(raw, delimiters) ;
                    });
    }

    public toString() {
        return this.text;
    }
}


export class MessageSegmentFieldComponent {
    
    constructor( public text:string, delimiters:MessageDelimiter) {

    }

}