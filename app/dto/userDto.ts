export class UsuarioDto{
    constructor(
        public id?: number,
        public name?:string,
        public email?:string,
        public password?:string,
        public organizationId?:number
    ){

    }
}