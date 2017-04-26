
export class MessageDelimiter {
    
    public segmentSeperator: any; // This should really be a RegExp or string...
    public fieldSeperator: string;
    public componentSeperator: string;
    public fieldRepeatSeperator:string;
    public subComponentSeperator:string;

    public static getDefaults() {
        var md = new MessageDelimiter();
        md.segmentSeperator = /\r\n|\r|\n/;
        md.fieldSeperator = "|";
        md.componentSeperator = "^";
        return md;
    }
    
    // returns the values from the message object...
    public static parseFromMessage( raw ) {
        throw new Error("parseFromMessage has not been implemented yet!");
    }
}