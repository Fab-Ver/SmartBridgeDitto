# SmartBridgeDitto
Smart Bridge Digital Twin created using [Eclipse Ditto](https://eclipse.dev/ditto/index.html) open source framework. 


After [installing Ditto](https://eclipse.dev/ditto/installation-running.html) on your system, we use Ditto's provided HTTP API to create Digital Twins. Execute the commands in the following order:
1. [Create Default Policy](#create-default-policy)
2. [Create Water Level Subsystem Thing](#create-water-level-subsystem-thing)
3. [Create Smart Light Subsystem Thing](#create-smart-light-subsystem-thing)
4. [Create Connection with Water Level Subsystem](#create-connection-with-water-level-subsystem)
5. [Create Connection with Smart Light Subsystem](#create-connection-with-smart-light-subsystem)
6. [Create Events Connection](#create-events-connection)
7. [Create Messages Connection](#create-messages-connection)


## Create Default Policy
Create a default policy with basic auth to access Things.
```
curl -X PUT 'http://localhost:8080/api/2/policies/ditto.default:policy' -u 'ditto:ditto' -H 'Content-Type: application/json' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/policies/default-policy.json)"
```


## Create Water Level Subsystem Thing 
```
curl --location --request PUT -u ditto:ditto 'http://localhost:8080/api/2/things/org.eclipse.ditto:water-level-subsystem' --header 'Content-Type: application/json' --data-raw '{"policyId": "ditto.default:policy", "definition": "https://raw.githubusercontent.com/Fab-Ver/SmartBridgeDitto/main/wot_models/subsystems/water-level-subsystem-1.0.0.tm.jsonld"}'
```


## Create Smart Light Subsystem Thing 
```
curl --location --request PUT -u ditto:ditto 'http://localhost:8080/api/2/things/org.eclipse.ditto:smart-light-subsystem' --header 'Content-Type: application/json' --data-raw '{"policyId": "ditto.default:policy","definition": "https://raw.githubusercontent.com/Fab-Ver/SmartBridgeDitto/main/wot_models/subsystems/smart-light-subsystem-1.0.0.tm.jsonld"}'
```


## Create Connection with Water Level Subsystem
Create a MQTT Connection with Water Level Subsystem's PA
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/connections/wls_mqtt_connection.json)"
```

## Create Connection with Smart Light Subsystem
Create a MQTT Connection with Smart Light Subsystem's PA
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/connections/sls_mqtt_connection.json)"
```

## Create Events Connection
Create an MQTT Connection to notify Smart Light Subsystem's PA when status is changed by Water Level Subsystem's DT (using events emitted by Ditto)
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/connections/events_connection.json)"
```


## Create Messages Connection
Create a MQTT Connection to route messages from [SmartBridgeDashboard](https://github.com/Fab-Ver/SmartBridgeDashboard) to Water Level Subsystem's PA
```
curl -X 'POST' 'http://localhost:8080/api/2/connections' -H 'accept: application/json' -H 'Content-Type: application/json' -u 'devops:foobar' -d "$(curl -s https://raw.githubusercontent.com/Fab-Ver/SmartBridgeDitto/main/connections/messages_connection.json)"
```


## Delete Default Policy
```
curl -X 'DELETE' 'http://localhost:8080/api/2/policies/ditto.default:policy' -H 'accept: */*' -H 'Authorization: Basic ZGl0dG86ZGl0dG8='
```
