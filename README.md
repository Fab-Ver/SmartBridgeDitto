# SmartBridgeWoTModel
Smart Bridge's model defined according to WoT Thing Model
## Create the Water Level Subsystem Thing 
```
curl --location --request PUT -u ditto:ditto 'http://localhost:8080/api/2/things/org.eclipse.ditto:water-level-subsystem' \ 
--header 'Content-Type: application/json' \
--data-raw '{"definition": "https://raw.githubusercontent.com/Fab-Ver/SmartBridgeWoTModel/main/water-level-subsystem-1.0.0.tm.jsonld"}'
```
## Delete Water Level Subsystem Thing 
```
curl -X 'DELETE' 'http://localhost:8080/api/2/policies/org.eclipse.ditto%3Awater-level-subsystem'   \
-H 'accept: */*'   \
-H 'Authorization: Basic ZGl0dG86ZGl0dG8='
```

