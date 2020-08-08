import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

def fig2img(fig):
    """Convert a Matplotlib figure to a PIL Image and return it"""
    import io
    buf = io.BytesIO()
    fig.savefig(buf)
    buf.seek(0)
    
    img = Image.open(buf)
    return img
x = np.arange(-3,3)
plt.plot(x)
fig = plt.gcf()

img = fig2img(fig)
print(img)
img.show()
