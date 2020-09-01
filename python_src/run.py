from sys import modules
import eel
from matplotlib.pyplot import figure
import meep as mp
import matplotlib.pyplot as plt
import meep as mp
import mpld3
import numpy as np
from meep.materials import Au
import io
import base64
import threading

from numpy.core.numeric import False_
import KillableThread as Thread
from pycodestyle import maximum_line_length
from Capturing import *
import autopep8
import importlib.util
# Set web files folder
capturing = Capturing()

eel.init('src', ['.tsx', '.ts', '.jsx', '.js', '.html'])


def on_read(line):
    # eel.say_hello_js(line)
    capturing.print(line)
    eel.print(line)
    pass


print("test")
capturing.on_readline(on_read)
capturing.start()


@eel.expose                         # Expose this function to Javascript
def say_hello_py(x):
    print('Hello from %s' % x)
    return('Hello from %s' % x)


say_hello_py('Python World!')  # Call a Javascript function

thread = None


@eel.expose
def meep_test(a, b):
    global thread
    thread = Thread.thread_with_trace(target=meep_run, args=(a, b))
    thread.start()


@eel.expose
def meep_kill():
    global thread
    thread.kill()


@eel.expose
def fixCode(S: str):
    return(autopep8.fix_code(S, options=autopep8.parse_args(['--aggressive', '', "--max-line-length", "80"])))


def meep_run(modulname, modulepath):
    global sim
    spec = importlib.util.spec_from_file_location(
        modulname, modulepath)
    foo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(foo)
    sim = foo.main()


@ eel.expose
def show_plot():
    global sim
    s = io.BytesIO()
    fig = plt.figure(1)
    sim.plot2D()
    plt.savefig(s, format='png')
    s = base64.b64encode(s.getvalue()).decode("utf-8")
    # s = mpld3.fig_to_html(fig=fig, no_extras=False, template_type="general")
    return(s)


# eel.start('index.html', options=options)
eel.start("index.html", mode=False,
          cmdline_args=["yarn", "run", "dev"], port=8080)
