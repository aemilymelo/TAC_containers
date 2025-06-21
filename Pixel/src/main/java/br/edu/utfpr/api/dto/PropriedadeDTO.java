package br.edu.utfpr.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import br.edu.utfpr.api.model.Propriedade;

public class PropriedadeDTO {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome pode ter no máximo 100 caracteres.")
    private String nome;

    @NotBlank(message = "A localização é obrigatória.")
    @Size(max = 150, message = "A localização pode ter no máximo 150 caracteres.")
    private String localizacao;

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    // Método para converter DTO para Entidade
    public Propriedade toEntity() {
        Propriedade propriedade = new Propriedade();
        propriedade.setNome(this.nome);
        propriedade.setLocalizacao(this.localizacao);
        return propriedade;
    }
}
