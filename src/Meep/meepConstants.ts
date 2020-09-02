import { Vector3, Python, FreqRange, Medium, Susceptibility, LorentzianSusceptibility, DrudeSusceptibility, NoisyLorentzianSusceptibility, NoisyDrudeSusceptibility, GyrotropicLorentzianSusceptibility, GyrotropicDrudeSusceptibility, GyrotropicSaturatedSusceptibility, MultilevelAtom, Transition, GeometricObject, Sphere, Cylinder, Wedge, Cone, Block, Ellipsoid, Prism, Matrix, Lattice } from "./meepGeom";

export const meepGeomClasses = [
    new Vector3(),
    new Block(),
    new Sphere(1),
    new Medium(),
    new Susceptibility(),
    new LorentzianSusceptibility(),
    new DrudeSusceptibility(),
    new NoisyLorentzianSusceptibility(),
    new FreqRange(0, 0),
    new NoisyDrudeSusceptibility(),
    new GyrotropicLorentzianSusceptibility(),
    new GyrotropicDrudeSusceptibility(),
    new GyrotropicSaturatedSusceptibility(),
    new MultilevelAtom(),
    new Transition(0, 0),
    new GeometricObject(),
    new Cylinder(1),
    new Wedge(1),
    new Cone(1),
    new Ellipsoid(),
    new Prism(),
    new Matrix(),
    new Lattice()
] as Array<Python>

