package br.edu.utfpr.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_dado_climatico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DadoClimatico extends BaseEntity {

    @Column(nullable = false)
    private String tipo; // temperatura, umidade, chuva

    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Column(nullable = true)
    private Double latitude;

    @Column(nullable = true)
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "estacao_id")
    private Estacao estacao;
}
