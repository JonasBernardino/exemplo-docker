package com.docker.api.controller;

import com.docker.api.service.ViaCepService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cep")
public class CepController {

    private final ViaCepService cepService;

    public CepController(ViaCepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<Object> buscar(@PathVariable String cep){
        return ResponseEntity.ok(cepService.consultarCep(cep));
    }
}
