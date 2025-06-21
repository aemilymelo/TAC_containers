package br.edu.utfpr.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import br.edu.utfpr.api.model.DadoClimatico;

public class DadoClimaticoDTO {

    @NotNull(message = "O tipo de dado climático é obrigatório.")
    @Size(min = 3, message = "O tipo de dado climático deve ter no mínimo 3 caracteres.")
    private String tipo; // Exemplo: "temperatura", "umidade", "chuva"

    @NotNull(message = "O valor do dado climático é obrigatório.")
    @Positive(message = "O valor deve ser positivo.")
    private Double valor; // O valor do dado climático (exemplo: 25.5 para temperatura)

    @NotNull(message = "A data e hora do dado climático são obrigatórias.")
    private LocalDateTime dataHora;

    private Double latitude; // Latitude opcional
    private Double longitude; // Longitude opcional

    @NotNull(message = "A estação associada é obrigatória.")
    private Long estacaoId; // ID da estação

    // Getters e Setters
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Long getEstacaoId() {
        return estacaoId;
    }

    public void setEstacaoId(Long estacaoId) {
        this.estacaoId = estacaoId;
    }

    // Método para converter DTO em entidade
    public DadoClimatico toEntity() {
        DadoClimatico dadoClimatico = new DadoClimatico();
        dadoClimatico.setTipo(this.tipo);
        dadoClimatico.setValor(this.valor);
        dadoClimatico.setDataHora(this.dataHora);
        dadoClimatico.setLatitude(this.latitude);
        dadoClimatico.setLongitude(this.longitude);
        return dadoClimatico;
    }
}
