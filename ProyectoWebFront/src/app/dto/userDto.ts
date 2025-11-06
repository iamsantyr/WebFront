export class UsuarioDto{
    constructor(
        public name?:string,
        public email?:string,
        public password?:string,
        public organizationId?:number
    ){

    }
}