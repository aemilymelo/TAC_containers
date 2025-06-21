package br.edu.utfpr.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import br.edu.utfpr.api.model.Estacao;

public class EstacaoDTO {

    @NotBlank(message = "O nome da estação é obrigatório.")
    private String nome;

    @NotBlank(message = "O tipo da estação é obrigatório.")
    private String tipo;

    @NotNull(message = "A propriedade é obrigatória.")
    private Long id; // Alterado para 'id' ao invés de 'propriedadeId'

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Método para converter DTO em entidade
    public Estacao toEntity() {
        Estacao estacao = new Estacao();
        estacao.setNome(this.nome);
        estacao.setTipo(this.tipo);
        return estacao;
    }
}
