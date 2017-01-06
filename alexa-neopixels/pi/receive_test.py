import paho.mqtt.client as mqtt
import json
from time import sleep

ch = "unitt.org.uk/tree1"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(ch)

def on_message(client, userdata, msg):
    print(msg.payload)
    if(msg.payload[:1]=="{"):
        payload = json.loads(msg.payload)
	if("intensity" in payload):
		brightness = float(payload["intensity"] * 0.01)
		print(str(brightness))
	if "colour" in payload:
		print payload['colour']

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("iot.eclipse.org", 1883, 60)
client.loop_forever()
