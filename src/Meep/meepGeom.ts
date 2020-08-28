import prettier from "prettier";
import parserTypeScript from "prettier/parser-typescript";
export class Python {
	constructor(pythonname?: string) {
		this.pythonname = pythonname;
	}
	pythonname: string | undefined;
}

export class Vector3 extends Python {
	constructor(
		public x: number = 0,
		public y: number = 0,
		public z: number = 0,
		pythonname: string = "undefined"
	) {
		super(pythonname);
	}
}

export class FreqRange extends Python {
	constructor(public min: number, public max: number, pythonname: string = "undefined") {
		super(pythonname);
	}
}
export class Medium extends Python {
	constructor(
		public epsilon_diag = new Vector3(1, 1, 1),
		public epsilon_offdiag = new Vector3(),
		public mu_diag = new Vector3(1, 1, 1),
		public mu_offdiag = new Vector3(),
		public E_susceptibilities = [],
		public H_susceptibilities = [],
		public E_chi2_diag = new Vector3(),
		public E_chi3_diag = new Vector3(),
		public H_chi2_diag = new Vector3(),
		public H_chi3_diag = new Vector3(),
		public D_conductivity_diag = new Vector3(),
		public D_conductivity_offdiag = new Vector3(),
		public B_conductivity_diag = new Vector3(),
		public B_conductivity_offdiag = new Vector3(),
		public epsilon = undefined,
		public index = undefined,
		public mu = undefined,
		public chi2 = undefined,
		public chi3 = undefined,
		public D_conductivity = undefined,
		public B_conductivity = undefined,
		public E_chi2 = undefined,
		public E_chi3 = undefined,
		public H_chi2 = undefined,
		public H_chi3 = undefined,
		public valid_freq_range = new FreqRange(-1e20, 1e20),
		pythonname: string = "undefined"
	) {
		super(pythonname);
	}
}
export class Susceptibility extends Python {
	constructor(
		sigma_diag = new Vector3() as Vector3,
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(pythonname);
		this.sigma = sigma;
		this.sigma_diag = sigma_diag;
		this.sigma_offdiag = sigma_offdiag;
	}
	sigma_diag: Vector3 | null = new Vector3();
	sigma_offdiag: Vector3 | null = new Vector3();
	sigma: any = null;
}

export class LorentzianSusceptibility extends Susceptibility {
	constructor(
		frequency = 0.0,
		gamma = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.frquency = frequency;
		this.gamma = gamma;
	}

	frquency: number = 0;
	gamma: number = 0;
}

export class DrudeSusceptibility extends Susceptibility {
	constructor(
		frequency = 0.0,
		gamma = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.frquency = frequency;
		this.gamma = gamma;
	}

	frquency: number = 0;
	gamma: number = 0;
}

export class NoisyLorentzianSusceptibility extends LorentzianSusceptibility {
	constructor(
		noise_amp = 0.0,
		frequency = 0.0,
		gamma = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.noise_amp = noise_amp;
	}
	noise_amp: number = 0;
}

export class NoisyDrudeSusceptibility extends DrudeSusceptibility {
	constructor(
		noise_amp = 0.0,
		frequency = 0.0,
		gamma = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.noise_amp = noise_amp;
	}
	noise_amp: number = 0;
}

export class GyrotropicLorentzianSusceptibility extends LorentzianSusceptibility {
	constructor(
		bias = new Vector3(),
		frequency = 0.0,
		gamma = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.bias = bias;
	}
	bias?: Vector3;
}

export class GyrotropicDrudeSusceptibility extends DrudeSusceptibility {
	constructor(
		bias = new Vector3(),
		frequency = 0.0,
		gamma = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.bias = bias;
	}
	bias?: Vector3;
}

export class GyrotropicSaturatedSusceptibility extends Susceptibility {
	constructor(
		bias = new Vector3(),
		frequency = 0.0,
		gamma = 0.0,
		alpha = 0.0,
		sigma_diag: Vector3 = new Vector3(),
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.bias = bias;
		this.frequency = frequency;
		this.gamma = gamma;
		this.alpha = alpha;
	}
	bias?: Vector3;
	frequency?: number;
	gamma?: number;
	alpha?: number;
}

export class MultilevelAtom extends Susceptibility {
	constructor(
		initial_populations = [],
		transitions = [],
		sigma_diag = new Vector3() as Vector3,
		sigma_offdiag: Vector3 = new Vector3(),
		sigma: any = null,
		pythonname: string = "undefined"
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.initial_populations = initial_populations;
		this.transitions = transitions;
	}
	initial_populations: Array<any>;
	transitions: Array<any>;
}
export class Transition extends Python {
	constructor(
		public from_level: number,
		public to_level: number,
		public transition_rate = 0,
		public frequency = 0,
		public sigma_diag = new Vector3(1, 1, 1),
		public gamma = 0,
		public pumping_rate = 0,
		pythonname: string = "undefined"
	) {
		super(pythonname);
	}
}
export class GeometricObject extends Python {
	constructor(
		public material = new Medium(),
		public center: Vector3 | undefined = new Vector3(),
		public epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(pythonname);
	}
}

export class Sphere extends GeometricObject {
	constructor(
		public radius: number,
		material = new Medium(),
		center = new Vector3(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(material, center, epsilon_func, pythonname);
	}
}

export class Cylinder extends GeometricObject {
	constructor(
		public radius: number,
		public axis: Vector3 = new Vector3(0, 0, 1),
		public height = 1e20,
		material = new Medium(),
		center = new Vector3(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(material, center, epsilon_func, pythonname);
	}
}

export class Wedge extends Cylinder {
	constructor(
		public radius: number,
		public wedge_angle = 2 * Math.PI,
		public wedge_start = new Vector3(1, 0, 0),
		axis: Vector3 = new Vector3(0, 0, 1),
		height = 1e20,
		material = new Medium(),
		center = new Vector3(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(radius, axis, height, material, center, epsilon_func, pythonname);
	}
}

export class Cone extends Cylinder {
	constructor(
		public radius: number,
		public radius2 = 0,
		axis: Vector3 = new Vector3(0, 0, 1),
		height = 1e20,
		material = new Medium(),
		center = new Vector3(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(radius, axis, height, material, center, epsilon_func, pythonname);
	}
}
export class Block extends GeometricObject {
	constructor(
		public size: Vector3,
		public e1 = new Vector3(1, 0, 0),
		public e2 = new Vector3(0, 1, 0),
		public e3 = new Vector3(0, 0, 1),
		material = new Medium(),
		center = new Vector3(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(material, center, epsilon_func, pythonname);
	}
}
export class Ellipsoid extends Block {
	constructor(
		size: Vector3,
		e1 = new Vector3(1, 0, 0),
		e2 = new Vector3(0, 1, 0),
		e3 = new Vector3(0, 0, 1),
		material = new Medium(),
		center = new Vector3(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(size, e1, e2, e3, material, center, epsilon_func, pythonname);
	}
}

export class Prism extends GeometricObject {
	constructor(
		public vertices: Array<Vector3>,
		public height: number,
		public axis = new Vector3(undefined, undefined, 1),
		public center = undefined,
		public sidewall_angle = 0,
		material = new Medium(),
		epsilon_func = undefined,
		pythonname: string = "undefined"
	) {
		super(material, center, epsilon_func, pythonname);
	}
}
export class Matrix extends Python {
	constructor(
		public c1 = new Vector3(),
		public c2 = new Vector3(),
		public c3 = new Vector3(),
		public diag = new Vector3(),
		public offdiag = new Vector3(),
		pythonname: string = "undefined"
	) {
		super(pythonname);
	}
}
export class Lattice extends Python {
	constructor(
		public size = new Vector3(1, 1, 1),
		public basis_size = new Vector3(1, 1, 1),
		public basis1 = new Vector3(1, 0, 0),
		public basis2 = new Vector3(0, 1, 0),
		public basis3 = new Vector3(0, 0, 1),
		pythonname: string = "undefined"
	) {
		super(pythonname);
	}
}
const f = (x: any) => {
	if (typeof x !== "object") {
		return x;
	} else {
		let keys: Array<string> = Object.keys(x);
		let a = x.constructor.name;
		a = "mp." + a;
		a += "(";
		for (const i in keys) {
			if (i !== "0") {
				if (parseInt(i) !== keys.length - 1) a = a + keys[i] + " = arg,";
				else a = a + keys[i] + " = arg)";
				a = a.replace("arg", f(x[keys[i]]));
			}
		}
		return a;
	}
};
let a = prettier.format(f(new Lattice()), {
	parser: "typescript",
	plugins: [parserTypeScript],
});

console.log(a);
