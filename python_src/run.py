import eel
import meep as mp
import matplotlib.pyplot as plt
import meep as mp
import numpy as np
from meep.materials import Au
import io
import base64
import threading
from Capturing import *
import multiprocessing 
# Set web files folder
capturing = Capturing()

eel.init('src', ['.tsx', '.ts', '.jsx', '.js', '.html'])
def on_read(line):
    # eel.say_hello_js(line)
    eel.print(line)
    pass
capturing.on_readline(on_read)
capturing.start()

@eel.expose                         # Expose this function to Javascript
def say_hello_py(x):
    print('Hello from %s' % x)
    return('Hello from %s' % x)

say_hello_py('Python World!') # Call a Javascript function

process = None 

@eel.expose
def meep_test():
    global process
    process = multiprocessing.Process(target=meep_run, args=())
    process.start() 

@eel.expose
def meep_kill():
    global process
    process.terminate()

def meep_run():

    k=mp.Ey # k is polarization component of source
    offsetx = 0.05
    block_thicknessy = 0.5 * 1
    block_thicknessx = 0.02
    spacing_thickness = block_thicknessy
    wvl_min = 0.400
    wvl_max = 0.700
    frq_min = 1/wvl_max
    frq_max = 1/wvl_min
    frq_cen = 0.5*(frq_min+frq_max)
    dfrq = frq_max-frq_min
    nfrq = 100
    Material= Au
    resolution = 80
    dpml = 0.11
    pml_layers = [mp.PML(dpml, direction=mp.X, side=mp.High),
                        mp.Absorber(dpml, direction=mp.X, side=mp.Low)]
    symmetries = [mp.Mirror(mp.Y,phase=-1)]

    celly = (spacing_thickness+block_thicknessy)
    cellx = block_thicknessx+2*dpml+2*offsetx

    geometry=[]

    sources = [mp.Source(mp.GaussianSource(frq_cen,fwidth=dfrq,is_integrated=True),
                        center=mp.Vector3(-0.5*cellx+dpml+0.01),
                        size=mp.Vector3(0,celly),
                        component=k)]
    sim = mp.Simulation(resolution=resolution,
                        symmetries=symmetries,
                        cell_size=mp.Vector3(cellx,celly),
                        dimensions=3,
                        boundary_layers=pml_layers,
                        sources=sources,
                        ensure_periodicity=True,
                        k_point=mp.Vector3())

    after_block_fr = mp.FluxRegion(center=mp.Vector3(0.5*cellx-dpml-0.01,0,0),size=mp.Vector3(0,celly))
    before_block_fr = mp.FluxRegion(center=mp.Vector3(-0.5*cellx+dpml+0.02,0,0),size=mp.Vector3(0,celly))

    after_block = sim.add_flux(frq_cen,dfrq,nfrq,after_block_fr)
    before_block = sim.add_flux(frq_cen,dfrq,nfrq,before_block_fr)
    pt = mp.Vector3(0.5*cellx-dpml-0.01,0,0)

    sim.run(until_after_sources=mp.stop_when_fields_decayed(50,k,pt,1e-3))


    after_block_flux =  mp.get_fluxes(after_block)
    before_block_flux_data = sim.get_flux_data(before_block)
    flux_freqs = mp.get_flux_freqs(after_block)

    sim.reset_meep()
    geometry=[mp.Block(mp.Vector3(block_thicknessx,block_thicknessy,mp.inf),
                        center=mp.Vector3(),
                        material=Material)]
    sim = mp.Simulation(resolution=resolution,
                        symmetries=symmetries,
                        cell_size=mp.Vector3(cellx,celly),
                        boundary_layers=pml_layers,
                        sources=sources,
                        k_point=mp.Vector3(),
                        ensure_periodicity=True,
                        geometry=geometry,
                        )
    before_block = sim.add_flux(frq_cen,dfrq,nfrq,before_block_fr)

    after_block = sim.add_flux(frq_cen,dfrq,nfrq,after_block_fr)
    sim.load_minus_flux_data(before_block,before_block_flux_data)
    sim.run(until_after_sources=mp.stop_when_fields_decayed(50,k,pt,1e-3))
    after_block_flux_second_run=  mp.get_fluxes(after_block)
    before_block_flux_second_run = mp.get_fluxes(before_block)
    # np.savetxt(f"tra_ez_ST{round(spacing_thickness,2)}.txt",after_block_flux_second_run)
    # np.savetxt(f"ref_ez_ST{round(spacing_thickness,2)}.txt",before_block_flux_second_run)
    # np.savetxt(f"in_ez_ST{round(spacing_thickness,2)}.txt",after_block_flux)
    transmittance_ratio= np.divide(after_block_flux_second_run,after_block_flux)
    wvls=np.divide(1,np.asarray(flux_freqs))
    # plt.plot(wvls,transmittance_ratio)
    plt.title(f"resolution: {resolution}, dpml: {dpml}, blockspacing: {spacing_thickness}")
    plt.xlabel("wavelengths")
    plt.ylabel("transmission")
    from datetime import datetime 
    time = datetime.now().strftime("%d-%m-%Y_%I-%M-%S_%p")
    name = __file__.split("/")
    name=name[len(name)-1]
    # plt.show()
    fig = plt.figure(1)
    sim.plot2D()
    #  plt.savefig(fname=f"/home/emirhan/meepUnderGraduateResearch/pictures/{name}-{time}.svg",format="svg")

@eel.expose
def show_plot():
    s = io.BytesIO()
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    return(s)

# eel.start('index.html', options=options)
eel.start("http://localhost:5000", mode="custom",cmdline_args=["yarn","run","dev"],port=8080)
