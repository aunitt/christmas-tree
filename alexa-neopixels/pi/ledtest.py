from bibliopixel.led import *
from bibliopixel.animation import StripChannelTest
from BiblioPixelAnimations.strip import Rainbows
from BiblioPixelAnimations.strip import ColorWipe
from bibliopixel.drivers.LPD8806 import *
import bibliopixel.colors as colors

#create driver for a 12 pixels
driver = DriverLPD8806(52, c_order = ChannelOrder.BRG)
led = LEDStrip(driver)

#anim = StripChannelTest(led)
#init animation; replace with whichever animation you'd like to use
#anim = Rainbows.RainbowCycle(led)

anim = ColorWipe.ColorWipe( led, colors.Red )

try:
    #run the animation
    anim.run( fps=60, max_steps=51 )
    print 'done'
except KeyboardInterrupt:
    #Ctrl+C will exit the animation and turn the LEDs offs
    led.all_off()
    led.update()
