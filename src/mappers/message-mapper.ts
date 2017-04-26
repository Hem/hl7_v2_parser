import * as _get from 'lodash.get';
import { Message, MessageSegment } from "../message";
import { GlobalMapsDefs } from './global-map-defs';

export class MessageMapper {

    
    public mappedSegments: any[] = [];

    constructor(message: Message, maps: Object = null) {
        this.mappedSegments.push(MessageMapper.mapMessage(message, maps));
    }

    /**
     * Returns an array of objects corresponding to the mapped segments...
     * @param message 
     * @param maps 
     */
    public static mapMessage(message: Message, maps: Object = null) {

        let mappedSegments: any[] = [];
        maps = maps || {};

        // loop through each segment
        for (let i: number = 0; i < message.length; i++) {

            const segment: MessageSegment = message.get(i);
            const map = maps[segment.name] || GlobalMapsDefs.getGlobalMap(segment.name);

            mappedSegments.push(this.mapSegment(segment, map));
        }

        return mappedSegments;
    }

    /**
     * returns a object that corresponds to the mapped object...
     * @param segment the segment object that needs to be mapped!
     * @param maps The map definition for the provided object.
     */
    public static mapSegment(segment: MessageSegment, maps: Object): any {

        const retObj = {
            '0': segment.name
        };

        for (let key in maps) {

            if (maps[key] !== 'undefined') {

                let m = maps[key];

                // if function call it.. expects a return value
                if (typeof m === 'function') {

                    retObj[key] = m(segment);

                } else {
                    // posiibly a string array notation...
                    // get the value
                    let value = _get(segment, m);
                    retObj[key] = value ? value.text : '';
                }
            }
        }


        return retObj;
    }

}

