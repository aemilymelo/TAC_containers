package br.edu.utfpr.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_propriedade")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Propriedade extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 150)
    private String localizacao;
}
