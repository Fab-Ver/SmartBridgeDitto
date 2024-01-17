# SmartBridgeDitto
Smart Bridge Digital Twin created using Eclipse Ditto open source framework


## Create Default Policy
```
curl -X PUT 'http://localhost:8080/api/2/policies/ditto.default:policy' -u 'ditto:ditto' -H 'Content-Type: application/json' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/policies/default-policy.json)"
```


## Create the Water Level Subsystem Thing 
```
curl --location --request PUT -u ditto:ditto 'http://localhost:8080/api/2/things/org.eclipse.ditto:water-level-subsystem' --header 'Content-Type: application/json' --data-raw '{"policyId": "ditto.default:policy", "definition": "https://raw.githubusercontent.com/Fab-Ver/SmartBridgeDitto/main/wot_models/subsystems/water-level-subsystem-1.0.0.tm.jsonld"}'
```


## Create the Smart Light Subsystem Thing 
```
curl --location --request PUT -u ditto:ditto 'http://localhost:8080/api/2/things/org.eclipse.ditto:smart-light-subsystem' --header 'Content-Type: application/json' --data-raw '{"policyId": "ditto.default:policy","definition": "https://raw.githubusercontent.com/Fab-Ver/SmartBridgeDitto/main/wot_models/subsystems/smart-light-subsystem-1.0.0.tm.jsonld"}'
```


## Delete Default Policy
```
curl -X 'DELETE' 'http://localhost:8080/api/2/policies/ditto.default:policy'   \
-H 'accept: */*'   \
-H 'Authorization: Basic ZGl0dG86ZGl0dG8='
```


## Create Connections 

MQTT Connection with Water Level Subsystem (SUB):
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/connections/wls_mqtt_connection.json)"
```

MQTT Connection with Smart Light Subsystem (SUB):
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/connections/sls_mqtt_connection.json)"
```

MQTT Target Connection (PUB):
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/connections/target_mqtt_connection.json)"
```

