function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload)); 
    const jsonData = JSON.parse(jsonString); 
    const thingId = jsonData.thingId.split(':'); 

    if(headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:smart-light-subsystem/light'){
        const value = {on : jsonData.on, waiting : jsonData.waiting};
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/smart-light/properties/', headers, value);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:smart-light-subsystem/dark') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/light-sensor/properties/dark', headers, jsonData.dark);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:smart-light-subsystem/detected') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/motion-sensor/properties/detected', headers, jsonData.detected);
    } else {
        return null;
    }
}