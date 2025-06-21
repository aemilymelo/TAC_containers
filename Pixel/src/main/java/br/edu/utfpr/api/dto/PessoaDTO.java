package br.edu.utfpr.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.edu.utfpr.api.model.Pessoa;

public class PessoaDTO {

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "A senha é obrigatória.")
    @JsonProperty("password")
    private String password;

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Método para converter DTO em entidade
    public Pessoa toEntity() {
        Pessoa p = new Pessoa();
        p.setNome(this.nome);
        p.setEmail(this.email);
        p.setPassword(this.password);
        return p;
    }
}
