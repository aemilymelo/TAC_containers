package br.edu.utfpr.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_estacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Estacao extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 150)
    private String tipo;

    @ManyToOne
    @JoinColumn(name = "propriedade_id")
    private Propriedade propriedade;
}
