package br.edu.utfpr.api.controller;

import br.edu.utfpr.api.dto.DadoClimaticoDTO;
import br.edu.utfpr.api.model.DadoClimatico;
import br.edu.utfpr.api.model.Estacao;
import br.edu.utfpr.api.service.DadoClimaticoService;
import br.edu.utfpr.api.service.EstacaoService;
import br.edu.utfpr.api.utils.ViewImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Dados Climáticos", description = "Recurso para gerenciamento e consulta de dados climáticos")
@RestController
@RequestMapping("/dados-climaticos")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DadoClimaticoController extends ViewImpl<DadoClimatico, Long> {

    private final EstacaoService estacaoService;
    private final DadoClimaticoService dadoClimaticoService;

    public DadoClimaticoController(DadoClimaticoService service, EstacaoService estacaoService) {
        super(service);
        this.estacaoService = estacaoService;
        this.dadoClimaticoService = service;
    }

    // ✅ Criar Dado Climático
    @Operation(summary = "Criar dado climático", description = "Cria um dado climático associado a uma estação específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dado climático criado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DadoClimatico.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Estação não encontrada", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/dto")
    public ResponseEntity<DadoClimatico> criarDadoClimatico(@RequestBody @Valid DadoClimaticoDTO dto) {
        // Buscar a Estação pelo ID
        ResponseEntity<Estacao> response = estacaoService.findById(dto.getEstacaoId());
        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.notFound().build(); // Retorna 404 se a Estação não for encontrada
        }

        Estacao estacao = response.getBody();
        DadoClimatico dadoClimatico = dto.toEntity();
        dadoClimatico.setEstacao(estacao);

        return service.save(dadoClimatico);
    }

    // ✅ Buscar por estação
    @Operation(summary = "Buscar dados climáticos por estação", description = "Obtém todos os dados climáticos de uma estação específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DadoClimatico.class))),
            @ApiResponse(responseCode = "404", description = "Estação não encontrada", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/por-estacao/{id}")
    public List<DadoClimatico> getByEstacao(
            @Parameter(description = "ID da estação para a qual os dados climáticos serão consultados") @PathVariable Long id) {
        return dadoClimaticoService.findByEstacaoId(id);
    }

    // ✅ Buscar por tipo
    @Operation(summary = "Buscar dados climáticos por tipo", description = "Obtém todos os dados climáticos filtrados por tipo (ex: temperatura, umidade).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DadoClimatico.class))),
            @ApiResponse(responseCode = "400", description = "Tipo inválido fornecido", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/por-tipo")
    public List<DadoClimatico> getByTipo(
            @Parameter(description = "Tipo de dado climático (ex: temperatura, umidade, chuva)") @RequestParam String tipo) {
        return dadoClimaticoService.findByTipoIgnoreCase(tipo);
    }

    // ✅ Buscar por período
    @Operation(summary = "Buscar dados climáticos por período", description = "Obtém dados climáticos entre um intervalo de datas e horas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DadoClimatico.class))),
            @ApiResponse(responseCode = "400", description = "Formato de data inválido", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/por-periodo")
    public List<DadoClimatico> getByPeriodo(
            @Parameter(description = "Data e hora de início do período no formato ISO (ex: 2023-01-01T00:00:00)") @RequestParam String inicio,
            @Parameter(description = "Data e hora de fim do período no formato ISO (ex: 2023-01-01T23:59:59)") @RequestParam String fim) {
        LocalDateTime dtInicio = LocalDateTime.parse(inicio);
        LocalDateTime dtFim = LocalDateTime.parse(fim);
        return dadoClimaticoService.findByDataHoraBetween(dtInicio, dtFim);
    }
}
