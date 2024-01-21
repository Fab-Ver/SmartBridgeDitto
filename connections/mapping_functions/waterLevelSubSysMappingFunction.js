function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload)); 
    const jsonData = JSON.parse(jsonString); 
    const thingId = jsonData.thingId.split(':'); 
    if(headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/status'){
        const status_wls = Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/status/properties/status', headers, jsonData.status);
        if(jsonData.status === 'ALARM'){
            const sys_off = Ditto.buildDittoProtocolMsg( thingId[0], 'smart-light-subsystem', 'things','twin', 'commands','modify','/features/status/properties/status',headers, 'SYS_OFF');
            return [ status_wls, sys_off];
        } else {
            const sys_on = Ditto.buildDittoProtocolMsg( thingId[0], 'smart-light-subsystem', 'things','twin', 'commands','modify','/features/status/properties/status',headers, 'SYS_ON');
            return [status_wls, sys_on];
        }
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/distance') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/water-level-sensor/properties/distance', headers, parseFloat(jsonData.distance));
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/angle') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/valve/properties/angle', headers, jsonData.angle);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/green') {
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/green-led/properties/on', headers, jsonData.on);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/red') {
        const value = {on : jsonData.on, blinking : jsonData.blinking};
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/red-led/properties/', headers, value);
    } else if (headers['mqtt.topic'] === 'subsystems/org.eclipse.ditto:water-level-subsystem/manual'){
        return Ditto.buildDittoProtocolMsg( thingId[0], thingId[1], 'things','twin', 'commands','modify','/features/manual/properties/on', headers, jsonData.manual);
    } else {
        return null;
    }
}