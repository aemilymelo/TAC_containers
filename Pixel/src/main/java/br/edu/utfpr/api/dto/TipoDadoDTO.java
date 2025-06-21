package br.edu.utfpr.api.dto;

import jakarta.validation.constraints.NotBlank;
import br.edu.utfpr.api.model.TipoDado;

public class TipoDadoDTO {

    @NotBlank(message = "O nome do tipo de dado é obrigatório.")
    private String nome; // Nome do tipo de dado, ex: "Temperatura"

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Método para converter DTO em entidade
    public TipoDado toEntity() {
        TipoDado tipoDado = new TipoDado();
        tipoDado.setNome(this.nome);
        return tipoDado;
    }
}
