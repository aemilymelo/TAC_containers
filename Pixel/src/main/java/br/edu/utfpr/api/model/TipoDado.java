package br.edu.utfpr.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_tipodado")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TipoDado extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String nome; // tipo de dado, ex: "Temperatura", "Umidade"
}
