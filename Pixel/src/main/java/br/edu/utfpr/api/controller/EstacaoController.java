package br.edu.utfpr.api.controller;

import br.edu.utfpr.api.dto.EstacaoDTO;
import br.edu.utfpr.api.model.Estacao;
import br.edu.utfpr.api.model.Propriedade;
import br.edu.utfpr.api.service.EstacaoService;
import br.edu.utfpr.api.service.PropriedadeService;
import br.edu.utfpr.api.utils.ViewImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Estação", description = "Recurso para gerenciamento de estações climáticas associadas a propriedades")
@RestController
@RequestMapping(value = "/estacao", produces = "application/json")
@SecurityRequirement(name = "bearerAuth")

public class EstacaoController extends ViewImpl<Estacao, Long> {

    private final PropriedadeService propriedadeService;

    public EstacaoController(EstacaoService service, PropriedadeService propriedadeService) {
        super(service);
        this.propriedadeService = propriedadeService;
    }

    @Operation(summary = "Criar nova estação", description = "Cria uma estação associada a uma propriedade existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estação criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Estacao.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Propriedade não encontrada", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/dto")
    public ResponseEntity<Estacao> criarEstacao(@RequestBody @Valid EstacaoDTO dto) {
        ResponseEntity<Propriedade> response = propriedadeService.findById(dto.getId());

        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(response.getStatusCode()).build();
        }

        Propriedade propriedade = response.getBody();
        Estacao estacao = dto.toEntity();
        estacao.setPropriedade(propriedade);

        return service.save(estacao);
    }

}
