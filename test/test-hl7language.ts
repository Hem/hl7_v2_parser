import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as HL7Dict from "hl7-dictionary";


@suite("HL7 Messages")
class TestPrintHL7Languages {

    @test('Print SIU_S12 message elements')
    test_print_siu_s12_message_elements() {

        const HL7Definition2_3 = HL7Dict.definitions['2.3'];

        console.dir(HL7Definition2_3.messages['SIU_S12'], {
            depth: 10,
            colors: true
        });
    }

    @test('Print MSH Message Segments')
    test_print_msh_segment() {

        const HL7Definition2_3 = HL7Dict.definitions['2.3'];

        console.dir(HL7Definition2_3.segments['PID'], {
            depth: 2,
            colors: true
        });

    }

    // @test('print field definitions')
    test_print_field_defs() {
        const HL7Definition2_3 = HL7Dict.definitions['2.3'];
        console.dir(HL7Definition2_3.fields["CM_MSG"], { depth: 2, colors: true });
    }

}