import { HeaderMessageSegment, MessageSegment } from './message-segment';
import { MessageDelimiter } from "./message-delimiters";
import * as _get from "lodash.get";

export class Message {

    public header:HeaderMessageSegment;

    public length:number = 0;

    _delimiters:MessageDelimiter;


    /**
     * Validates and parses HL7 v.2 documents
     */
    constructor( public text:string ) {
        this.validateMessage();
        this._delimiters = MessageDelimiter.getDefaults();
        this.loadSegments();
        this.header = new HeaderMessageSegment(this[0]);
    }


    /**
     * Validates the inbound message is a valid HL7 document.
     */
    validateMessage() {
        
        if (this.text.substr(0, 3) !== 'MSH') {
            throw new Error('Invalid message type found');
        }

        if (this.text.length < 10 ) {
            throw new Error('Not enought content');
        }
    }


    /**
     * Creates and loads the segments into the this[] scope
     */
    loadSegments () {
        this.text.split(this._delimiters.segmentSeperator).forEach(raw => {
            // removes empty lines
            if ( raw.length > 0 ) {
                this[this.length++] = new MessageSegment(raw, this._delimiters);
            }
        });
    }


    /**
     * returns the expression object
     * @param expression array positional syntax that works with lodash.get. example "[n][n][n]"
     */
    get(expression) : any {
        return _get(this, expression);
    }


    /**
     * returns the text value (raw) 
     * @param expression 
     */
    getText(expression) : string {
        var value = this.get(expression);
        return value.text || value.toString();
    }
}