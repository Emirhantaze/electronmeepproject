export interface EMPTYSIMULATION {
	name?: string;
	type: string;
	values: any;
}

// after this line all meep functinolty will be extracted here for later from examples of python meep

// All interfaces will start with `IMeep{name of funtion or imported object}`
// Enums will named as `EMeep{name of funtion or imported object}`

// Predifined materials

export interface IMeepinf {
	pythonName?: string;
}

// Constants (Enumerated Types)

export enum EMeepdirections {
	X,
	Y,
	Z,
	R,
	P,
}

export enum EMeepside {
	High = "High",
	Low = "Low",
}

export enum EMeepboundary_condition {
	Ex = 0,
	Ey,
	Er,
	Ep,
	Ez,
	Hx,
	Hy,
	Hr,
	Hp,
	Hz,
	Bx,
	By,
	Br,
	Bp,
	Bz,
	Dx,
	Dy,
	Dr,
	Dp,
	Dz,
	Dielectric,
	Permeability,
}

export enum EMeepderived_component {
	Sx,
	Sy,
	Sz,
	Sr,
	Sp,
	EnergyDensity,
	D_EnergyDensity,
	H_EnergyDensity,
}
