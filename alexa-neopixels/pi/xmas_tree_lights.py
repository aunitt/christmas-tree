import paho.mqtt.client as mqtt
import json
from time import sleep
from bibliopixel.led import *
from BiblioPixelAnimations.strip import ColorWipe
from bibliopixel.drivers.LPD8806 import *
import bibliopixel.colors as colors

ch = "unitt.org.uk/tree1"

driver = DriverLPD8806(52, c_order = ChannelOrder.BRG)
led = LEDStrip(driver)

def ChangeColour( colour ):
    anim = ColorWipe.ColorWipe( led, colour )
    anim.run( fps=60, max_steps=51 )

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
		wanted_colour = payload['colour'].title()
        print wanted_colour
        try:
            colour = getattr( colors, wanted_colour )
            print colour
            ChangeColour( colour )
        except AttributeError:
            pass

# Main code
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("iot.eclipse.org", 1883, 60)
try:
    client.loop_forever()
finally:
    led.all_off()
    led.update()
