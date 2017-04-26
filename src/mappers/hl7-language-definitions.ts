import * as HL7Dict from "hl7-dictionary";

export class Hl7LanguageDefinitions {
    
    definitions:any; 

    constructor( messageVersion: string, messageType: string ) {
        this.definitions = HL7Dict.definitions[messageVersion].messages[messageType];
    }

    parseMessageSegments ( segments:any[] ) {
        
        let message = {};

        
        let lastSegment; // This is for notes.. etc...
        let lastParentSegments = {};

        for ( let i = 0; i < segments.length; i++ ) {
            var segment = segments[i];

            if ( segment[0] === 'NTE' ) {
                lastSegment.NTE = lastSegment.NTE || [];
                lastSegment.NTE.push(segment);
                continue;
            }

            var segmentInfo = this.getSegmentInfo( segment.name ); 



        }
        
        return message;
    }


    getMatchedSegment( segment, segmentName,  parentSegment = null, level= 0) {
        if (segment.name === segmentName) {
            return { 
                parentSegment: parentSegment,
                isParent : segment.children || false,
                isArray : segment.max !== 1,
                level: level
            };
        }

        if ( segment.children ) {            
            var info = segment.children.forEach(child => this.getMatchedSegment(child, segmentName, segment.name, level + 1 ));

            if ( info ) {
                return info;
            }
        }

    }

    getSegmentInfo( segmentName ) {

        let segmentInfo = null;

        this.definitions.segments
            .forEach(segment => {
                var info = this.getMatchedSegment(segment, segmentName);
                
                if (info) {
                    segmentInfo = info;
                }
            });

        return segmentInfo;
    }

}
