export class ProcesoDto{
    constructor(
        public id?:number,
        public name?:string,
        public description?:string,
        public category?:string,
        public status?:string, //cambiar tipo
        public organizationId?: number,//cambiar tipo
        public activityIds?:number,//cambiar tipo
        public archIds?: number,//cambiar tipo
        public gatewayIds?:number//cambiar tipo
    ){}
}