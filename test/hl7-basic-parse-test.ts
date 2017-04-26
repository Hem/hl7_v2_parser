import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Message } from "../src/message/message";
import { expect, assert } from 'chai';


@suite("Test HL7 Basic Parser")
class TestHl7BasicParser {

    @test("should parse message header correctly.")
    assert_read_message_header() {
        
        //https://datica.com/academy/hl7-204-the-hl7-scheduling-messages-siu-and-srm/
        const hl7Message = `MSH|^~\\&|EPIC|EPIC|||20160502162033||SIU^S12|538|D|2.3||`;

        const header = new Message(hl7Message).header;

        const expectedHeader = {    encodingChars: '^~\\&',
                                    messageType: 'SIU_S12',
                                    messageControlId: '538',
                                    processingId: 'D',
                                    hl7VersionId: '2.3' };
        
        expect(header).to.deep.equal(expectedHeader);
    }


    @test("should parse message header2 correctly.")
    assert_read_message_header2() {
        
        //https://datica.com/academy/hl7-204-the-hl7-scheduling-messages-siu-and-srm/
        const hl7Message = `MSH|^~\\&||COCSR|||201704101450||SIU^S12|SRSCHO.1.904|D|2.4|||AL|NE|`;

        const header = new Message(hl7Message).header;

        const expectedHeader = {    encodingChars: '^~\\&',
                                    messageType: 'SIU_S12',
                                    messageControlId: 'SRSCHO.1.904',
                                    processingId: 'D',
                                    hl7VersionId: '2.4' };

        expect(header).to.deep.equal(expectedHeader);
    }
    
}