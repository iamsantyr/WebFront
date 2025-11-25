package com.example.proyectoweb;

import com.example.proyectoweb.Dto.OrganizationDto;
import com.example.proyectoweb.Mapper.Mapper;
import com.example.proyectoweb.Modelo.Organization;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProyectoWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProyectoWebApplication.class, args);

    }
    @Bean
    public CommandLineRunner run(Mapper mapper) {
        return args -> {
            Organization org = new Organization(1L, "tes", "nit", "test@email.com");
            OrganizationDto dto = mapper.ConvertirOrg(org);

            System.out.println("ORIGINAL: " + org);
            System.out.println("DTO: " + dto);
        };
    }

}
