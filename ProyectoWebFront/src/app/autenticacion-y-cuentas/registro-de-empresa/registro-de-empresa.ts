import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrganizationService, OrganizationDto } from '../../services/organization.service';
import { Router } from '@angular/router';
import { EmpresaDto } from '../../dto/empresaDto';
import { UsuarioService } from '../../services/Usuario/usuario-service';

@Component({
  selector: 'app-registro-de-empresa',
  imports: [FormsModule],
  templateUrl: './registro-de-empresa.html',
  styleUrl: './registro-de-empresa.css'
})
export class RegistroDeEmpresa implements OnInit {
  empresaDto: EmpresaDto = new EmpresaDto();

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  onRegistrarEmpresa(){
    this.crearEmpresa();

  }
  crearEmpresa(){
    this.organizationService.crear(this.empresaDto)
    .subscribe(data=>{
      console.log(data)
    })
  }

}