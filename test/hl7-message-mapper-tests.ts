import { Hl7DefaultMaps } from './hl7-default-maps';
import { Message } from '../src/message';
import { MessageMapper, GlobalMapsDefs } from '../src/mappers';
import { suite, test, slow, timeout, skip, only } from 'mocha-typescript';
import { expect, assert } from 'chai';

@suite('HL7 Message Mapper Tests')
class Hl7MessageMapperTests {

    // tslint:disable-next-line:max-line-length
    hl7Message = `MSH|^~\\&|EPIC|EPIC|||20160502162033||SIU^S12|538|D|2.3||
SCH||350463||||BOOK||738|60|MIN|20170222140000^^^20170222140000|||||||||TESTSN^SCHEDULE^NURSE^^|||||Sch^Scheduled^SCHEDULING||
PID|1||30745109^^^^EPI||FREDERICKS^JANE^I^^MRS.^||19730501|F||Cauc|421 N. BAKER ST^^MADISON^WI^53513^US^^^DN|DN|(608)555-6789|(608)555-4321||S||11396810|321-87-6543||||^^^WI^^
RGS|1|A|094
AIS|1||73610^X-RAY ANKLE 3+ VW^CPT|20160515134500|15|min|45|min||
AIP|1||1069^GOOD^ALLAN^B|RADIOLOGIST||20160515134500|15|min|45|min||`;

    // PV1|||^^^CARE HEALTH SYSTEMS^^^^^||||1173^MATTHEWS^JAMES^A^^^||||||||||||610613||||||||||||||||||||||||||||||||V
    // DG1||I10|S82^ANKLE FRACTURE^I10|ANKLE FRACTURE||

    static before() {
        Hl7DefaultMaps.setDefaultGlobalMaps();
    }




    @test('should map the hl7 message to object based on segment name and provided mappings')
    assert_message_mapping_works() {


        const message = new Message(this.hl7Message);

        
        const mappedObject = MessageMapper.mapMessage(message);


        const expectedObject = [{
            '0': 'MSH',
            sendingApplication: 'EPIC',
            sendingFacility: 'EPIC',
            messageType: 'SIU^S12',
            messageTypeFunc: 'SIU_S12',
            messageControlId: '538',
            dateTimeMessageSent: "20160502162033"
        },
        {
            '0': 'SCH',
            reason: 'BOOK',
            type: '738',
            date: '20170222140000',
            duration: '60',
            durationUnit: 'MIN',
            scheduleId: '',
            location: '',
            placerId: '',
            fillerId: '350463'
        },
        {
            '0': 'PID',
            namePrefix: 'MRS.',
            nameFirst: 'JANE',
            nameMiddle: 'I',
            nameLast: 'FREDERICKS',
            nameSuffix: '',
            sex: 'F',
            race: 'Cauc',
            addressLineOne: '421 N. BAKER ST',
            addressCity: 'MADISON',
            addressState: 'WI',
            addressPostalCode: '53513',
            addressCountry: 'US',
            dateOfBirth: '19730501',
            primaryLanguage: '',
            phone: '(608)555-6789',
            email: '',
            identities: { mrn: '30745109', ssn: '321-87-6543', acountNumber: '11396810' }
        },
        {
            '0': "RGS",
            description: "094",
            groupId: "1",
            segmentActionCode: "A"
        },
        {
            '0': 'AIS',
            "serviceDescription": "X-RAY ANKLE 3+ VW",
            "serviceId": "73610"
        },
        {
            '0': 'AIP',
            "personnelDescription": "GOOD, ALLAN B",
            "personnelId": "1069",
            "resourceGroup": "",
            "role": "RADIOLOGIST"
        }];


        expect(mappedObject).to.deep.equal(expectedObject);
        // console.dir(mappedObject, { depth: 2, colors: true });
    }



    @test('should map segments using callback functions and positional properties')
    assert_segment_mapping_works() {

        const message = new Message(this.hl7Message);

        const mshSegment = message[0];

        const mshMaps = {
            'sendingApplication': '[3]',
            'sendingFacility': '[4]',
            'messageType': '9',
            'messageTypeFunc': (seg) => {
                return `${seg.getText("[9][0]")}_${seg.getText("[9][1]")}`;
            }
        };

        const expectedObject = {
            '0': 'MSH',
            sendingApplication: 'EPIC',
            sendingFacility: 'EPIC',
            messageType: 'SIU^S12',
            messageTypeFunc: 'SIU_S12'
        };

        const mappedObject = MessageMapper.mapSegment(mshSegment, mshMaps);

        expect(mappedObject).to.deep.equal(expectedObject);

    }


}