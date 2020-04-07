var fs = require("fs");
let meep;
let simText;
fs.readFile("meep.json",(a,b) =>{
    meep = JSON.parse(b.toString());

/*
sim = mp.Simulation(cell_size=cell,//mp.Vector(3)
                    boundary_layers=pml_layers,//[]
                    geometry=geometry,//[]
                    sources=sources,//[]
                    resolution=resolution)//int
*/
});
