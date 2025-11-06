export class ActividadDto{
    constructor(
        public id?:number,
        public name?:string,
        public type?: string,
        public description?:string,
        public x?: number,
        public y?:number
    ){}
}