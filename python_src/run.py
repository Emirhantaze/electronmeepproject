import eel

# Set web files folder
eel.init('build')

@eel.expose                         # Expose this function to Javascript
def say_hello_py(x):
    print('Hello from %s' % x)
    return('Hello from %s' % x)

say_hello_py('Python World!') # Call a Javascript function


options = {
	'mode': 'custom',
	'cmdline_args': ['../node_modules/electron/dist/electron.exe', '.']
}

# eel.start('index.html', options=options)
eel.start('index.html', mode='custom',port=8080, cmdline_args=['node_modules/electron/dist/electron', '.'])