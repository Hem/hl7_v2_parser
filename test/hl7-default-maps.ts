import { GlobalMapsDefs } from '../src/mappers';


export class Hl7DefaultMaps {

    static setDefaultGlobalMaps() {

        GlobalMapsDefs.setGlobalMap('MSH', {
            'sendingApplication': '[3]',
            'sendingFacility': '[4]',
            'messageType': '[9]',
            'messageTypeFunc': (seg) => {
                return `${seg[9][0].text}_${seg[9][1].text}`;
            },
            'messageControlId': '[10]',
            'dateTimeMessageSent': '[7]'
        });


        GlobalMapsDefs.setGlobalMap('SCH', {
            reason: '[6]',
            type: '[8]',
            date: '[11][0]',
            duration: '[9]',
            durationUnit: '[10]',
            scheduleId: '[5]',
            location: '[19]',
            placerId: '[1]',
            fillerId: '[2]'
        });


        GlobalMapsDefs.setGlobalMap('PID', {
            namePrefix: "[5][4]",
            nameFirst: "[5][1]",
            nameMiddle: "[5][2]",
            nameLast: "[5][0]",
            nameSuffix: "[5][3]",
            sex: "[8]",
            race: "[10][0]",
            addressLineOne: "[11][0]",
            addressCity: "[11][2]",
            addressState: "[11][3]",
            addressPostalCode: "[11][4]",
            addressCountry: "[11][5]",
            dateOfBirth: "[7]",
            primaryLanguage: "[15]",
            phone: "[13][0]",
            email: "[14][3]",
            identities: (seg) => {
                return {
                    mrn: seg.get('[3][0]').text,
                    ssn: seg.get('[19]').text,
                    acountNumber: seg.get('[18]').text
                };
            }
        });


        GlobalMapsDefs.setGlobalMap('RGS', {
            'groupId': '[1]',
            'segmentActionCode': '[2]',
            'description': '[3]'
        });


        GlobalMapsDefs.setGlobalMap('AIG', {
            resourceId: "[3]",
            resourceType: "[4][0]",
            resourceGroup: "[5]",
            resourceQuantity: "[6]"
        });


        GlobalMapsDefs.setGlobalMap('AIL', {
            resourceId: "[3]",
            locationType: "[4]",
            locationGroup: "[5]"
        });


        GlobalMapsDefs.setGlobalMap('AIP', {
            personnelId: "[3][0]",
            personnelDescription: (seg) => {
                return seg.getText("[3][1]") + ", " + seg.getText("[3][2]") + " " + seg.getText("[3][3]");
            },
            role: "[4][0]",
            resourceGroup: "[5]"
        });


        GlobalMapsDefs.setGlobalMap('AIS', {
            serviceId: "[3][0]",
            serviceDescription: "[3][1]"
        });


        GlobalMapsDefs.setGlobalMap('NTE', {
            setId: '[1]',
            sourceOfComment: '[2]',
            comment: '[3]',
            commentType: '[4]'
        });

    }
}