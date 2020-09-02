export class Python {
	constructor(pythonname?: string | undefined) {
		this.pythonname = pythonname;
	}
	pythonname: string | undefined;
	__classname: string = "Python"

}

export class Vector3 extends Python {
	constructor(
		public x?: number,
		public y?: number,
		public z?: number,
		pythonname?: string | undefined
	) {
		super(pythonname);
	}
	__classname: string = "Vector3"

}

export class FreqRange extends Python {
	constructor(public min: number, public max: number, pythonname?: string) {
		super(pythonname);
	}
	__classname: string = "FreqRange"

}
export class Medium extends Python {
	constructor(
		public epsilon_diag?: Vector3,
		public epsilon_offdiag?: Vector3,
		public mu_diag?: Vector3,
		public mu_offdiag?: Vector3,
		public E_susceptibilities = [],
		public H_susceptibilities = [],
		public E_chi2_diag?: Vector3,
		public E_chi3_diag?: Vector3,
		public H_chi2_diag?: Vector3,
		public H_chi3_diag?: Vector3,
		public D_conductivity_diag?: Vector3,
		public D_conductivity_offdiag?: Vector3,
		public B_conductivity_diag?: Vector3,
		public B_conductivity_offdiag?: Vector3,
		public epsilon?: number,
		public index?: number,
		public mu?: number,
		public chi2?: number,
		public chi3?: number,
		public D_conductivity?: number,
		public B_conductivity?: number,
		public E_chi2?: number,
		public E_chi3?: number,
		public H_chi2?: number,
		public H_chi3?: number,
		public valid_freq_range = new FreqRange(-1e20, 1e20),
		pythonname?: string | undefined
	) {
		super(pythonname);
	}
	__classname: string = "Medium"

}
export class Susceptibility extends Python {
	constructor(
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(pythonname);
		this.sigma = sigma;
		this.sigma_diag = sigma_diag;
		this.sigma_offdiag = sigma_offdiag;
	}
	sigma_diag?: Vector3;
	sigma_offdiag?: Vector3;
	sigma?: number;
	__classname: string = "Susceptibility"

}

export class LorentzianSusceptibility extends Susceptibility {
	constructor(
		frequency?: number,
		gamma?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.frquency = frequency;
		this.gamma = gamma;
	}

	frquency?: number;
	gamma?: number;
	__classname: string = "LorentzianSusceptibility"

}

export class DrudeSusceptibility extends Susceptibility {
	constructor(
		frequency?: number,
		gamma?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.frquency = frequency;
		this.gamma = gamma;
	}

	frquency?: number;
	gamma?: number;
	__classname: string = "DrudeSusceptibility"

}

export class NoisyLorentzianSusceptibility extends LorentzianSusceptibility {
	constructor(
		noise_amp?: number,
		frequency?: number,
		gamma?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.noise_amp = noise_amp;
	}
	noise_amp?: number;
	__classname: string = "NoisyLorentzianSusceptibility"


}

export class NoisyDrudeSusceptibility extends DrudeSusceptibility {
	constructor(
		noise_amp?: number,
		frequency?: number,
		gamma?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.noise_amp = noise_amp;
	}
	noise_amp?: number;
	__classname: string = "NoisyDrudeSusceptibility"

}

export class GyrotropicLorentzianSusceptibility extends LorentzianSusceptibility {
	constructor(
		bias?: Vector3,
		frequency?: number,
		gamma?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.bias = bias;
	}
	bias?: Vector3;
	__classname: string = "GyrotropicLorentzianSusceptibility"
}

export class GyrotropicDrudeSusceptibility extends DrudeSusceptibility {
	constructor(
		bias?: Vector3,
		frequency?: number,
		gamma?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
	) {
		super(frequency, gamma, sigma_diag, sigma_offdiag, sigma, pythonname);
		this.bias = bias;
	}
	bias?: Vector3;
	__classname: string = "GyrotropicDrudeSusceptibility"

}

export class GyrotropicSaturatedSusceptibility extends Susceptibility {
	constructor(
		bias?: Vector3,
		frequency?: number,
		gamma?: number,
		alpha?: number,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: number,
		pythonname?: string | undefined
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
	__classname: string = "GyrotropicDrudeSusceptibility"

}

export class MultilevelAtom extends Susceptibility {
	constructor(
		initial_populations?: Array<Number>,
		transitions?: Array<Transition>,
		sigma_diag?: Vector3,
		sigma_offdiag?: Vector3,
		sigma?: any | undefined,
		pythonname?: string | undefined
	) {
		super(sigma_diag, sigma_offdiag, sigma, pythonname);
		this.initial_populations = initial_populations;
		this.transitions = transitions;
	}
	initial_populations?: Array<Number>;
	transitions?: Array<Transition>;
	__classname: string = "MultilevelAtom"

}
export class Transition extends Python {
	constructor(
		public from_level: number,
		public to_level: number,
		public transition_rate?: number,
		public frequency?: number,
		public sigma_diag?: Vector3,
		public gamma?: number,
		public pumping_rate?: number,
		pythonname?: string | undefined
	) {
		super(pythonname);
	}
	__classname: string = "Transition"

}
export class GeometricObject extends Python {
	constructor(
		public material?: Medium,
		public center?: Vector3 | undefined,
		public epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(pythonname);
	}
	__classname: string = "GeometricObject"

}

export class Sphere extends GeometricObject {
	constructor(
		public radius: number,
		material?: Medium,
		center?: Vector3,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(material, center, epsilon_func, pythonname);
	}
	__classname: string = "Sphere"

}

export class Cylinder extends GeometricObject {
	constructor(
		public radius: number,
		public axis?: Vector3,
		public height?: number,
		material?: Medium,
		center?: Vector3,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(material, center, epsilon_func, pythonname);
	}
	__classname: string = "Cylinder"

}

export class Wedge extends Cylinder {
	constructor(
		public radius: number,
		public wedge_angle?: number,
		public wedge_start?: Vector3,
		axis?: Vector3,
		height?: number,
		material?: Medium,
		center?: Vector3,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(radius, axis, height, material, center, epsilon_func, pythonname);
	}
	__classname: string = "Wedge"

}

export class Cone extends Cylinder {
	constructor(
		public radius: number,
		public radius2?: number,
		axis?: Vector3,
		height?: number,
		material?: Medium,
		center?: Vector3,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(radius, axis, height, material, center, epsilon_func, pythonname);
	}
	__classname: string = "Cone"

}
export class Block extends GeometricObject {
	constructor(
		public size?: Vector3,
		public e1?: Vector3,
		public e2?: Vector3,
		public e3?: Vector3,
		material?: Medium,
		center?: Vector3,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(material, center, epsilon_func, pythonname);
	}
	__classname: string = "Block"

}
export class Ellipsoid extends Block {
	constructor(
		size?: Vector3,
		e1?: Vector3,
		e2?: Vector3,
		e3?: Vector3,
		material?: Medium,
		center?: Vector3,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(size, e1, e2, e3, material, center, epsilon_func, pythonname);
	}
	__classname: string = "Ellipsoid"

}

export class Prism extends GeometricObject {
	constructor(
		public vertices?: Array<Vector3>,
		public height?: number,
		public axis?: Vector3,
		public center?: Vector3,
		public sidewall_angle?: number,
		material?: Medium,
		epsilon_func?: string,
		pythonname?: string | undefined
	) {
		super(material, center, epsilon_func, pythonname);
	}
	__classname: string = "Prism"

}
export class Matrix extends Python {
	constructor(
		public c1?: Vector3,
		public c2?: Vector3,
		public c3?: Vector3,
		public diag?: Vector3,
		public offdiag?: Vector3,
		pythonname?: string | undefined
	) {
		super(pythonname);
	}
	__classname: string = "Matrix"

}
export class Lattice extends Python {
	constructor(
		public size?: Vector3,
		public basis_size?: Vector3,
		public basis1?: Vector3,
		public basis2?: Vector3,
		public basis3?: Vector3,
		pythonname?: string | undefined
	) {
		super(pythonname);
	}
	__classname: string = "Lattice"
}
const f = (x: any) => {
	if (typeof x !== "object") {
		return x;
	} else {
		let keys: Array<string> = Object.keys(x);
		let a = x.constructor.name;
		if (a === "Array") {
			return "[]"
		}
		else {

			a = "mp." + a;
			a += "(";
			for (const i in keys) {
				if (!(keys[i] in { pythonname: "", __classname: "" })) {
					if (x[keys[i]] !== undefined) {
						if (parseInt(i) !== keys.length - 1) a = a + keys[i] + " = arg,";
						else a = a + keys[i] + " = arg";
						a = a.replace("arg", f(x[keys[i]]));
					}
				}
			}
			return a + ")";
		}
	}
};


// let text = "";
// console.log(f(new Cone(1, 12, new Vector3(1, 1, 1), 100, new Medium(), new Vector3(), undefined)))
// window.eel.fixCode(f(new Cone(1, 12, new Vector3(1, 1, 1), 100, new Medium(), new Vector3(), undefined)))((data: string) => {
// 	text = data
// 	console.log((text))
// });
// console.log(JSON.stringify((new Cone(1, 12, new Vector3(1, 1, 1), 100, new Medium(), new Vector3(), undefined))))
