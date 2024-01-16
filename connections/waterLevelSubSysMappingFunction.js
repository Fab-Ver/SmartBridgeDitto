function wlsMapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload)); const jsonData = JSON.parse(jsonString); 
    const thingId = jsonData.thingId.split(':'); 

    if(headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/status'){
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/status/properties/status', headers, jsonData.status);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/distance') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/water-level-sensor/properties/distance', headers, jsonData.distance);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/angle') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/valve/properties/angle', headers, jsonData.angle);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/green') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/green-led/properties/on', headers, jsonData.on);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/red') {
        const value = {
            on : jsonData.on,
            blinking : jsonData.blinking
        };
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/red-led/properties/', headers, value);
    } else {
        return null;
    }
}