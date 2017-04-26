import { MessageDelimiter } from "./message-delimiters";
import { MessageSegmentField } from "./message-segment-field";
import * as _get from "lodash.get";


export class MessageSegment {

    public name:string;
    public length:number = 0;

    // load each segment into memory...
    constructor( public text:string, delim:MessageDelimiter ) {
        
        let textArray = this.text.split(delim.fieldSeperator);

        this.name = textArray[0];

        // add the darn fieldSeperator
        if ( this.name === 'MSH') {
            let tempArray = textArray.slice(1);
            
            textArray = [ textArray[0], delim.fieldSeperator ];
            textArray.push(...tempArray);
        }

        this.loadFields(textArray, delim);
    }


    loadFields (fieldsRaw:string[], delim:MessageDelimiter) {
        fieldsRaw.forEach(raw => {
            this[this.length++] = new MessageSegmentField(raw, delim);
        });
        
    }


    public toString(): string {
        return this.text;
    }


    /**
     * Returns the element that matched the expression
     * @param expression array notaion that lodash.get can use
     */
    public get(expression) : any {
        return _get(this, expression);
    }


    /**
     * Returns the element text (raw) that matched the expression
     * @param expression array notaion that lodash.get can use
     */
    getText(expression) : string {        
        var value = this.get(expression);
        return value ? value.text || value.toString() : null;
    }
}

/**
 * Message header segment, we provide basic properties that help with identification of the inbound message.
 */
export class HeaderMessageSegment {
    public fieldSeperator:string;
    public encodingChars:string;
    public messageType:string;
    public messageControlId:string;
    public processingId:string;
    public hl7VersionId:string;

    constructor(segment:MessageSegment) {

        this.encodingChars = segment.getText("[2]"); // 1st segment?
        this.messageType = `${segment.getText("[9][0]")}_${segment.getText("[9][1]")}`;
        this.messageControlId = segment.getText("[10]");
        this.processingId = segment.getText("[11]");
        this.hl7VersionId = segment.getText("[12]"); 
    }
}


