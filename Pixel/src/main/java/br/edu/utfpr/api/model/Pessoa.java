package br.edu.utfpr.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tb_pessoa")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Pessoa extends BaseEntity {

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "email", nullable = false, length = 90)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    public void setUsername(String value){
        this.nome = value;
    }
    public String getUsername(){
        return this.nome;
    }
    public void setEmail(String value){
        this.email = value;
    }
    public String getEmail(){
        return this.email;
    }
    public void setNome(String value){
        this.nome = value;
    }
    public String getNome(){
        return this.nome;
    }
    public String getPassword(){
        return this.password;
    }

    public void setPassword(String value){
        this.password = value;
    }
}
