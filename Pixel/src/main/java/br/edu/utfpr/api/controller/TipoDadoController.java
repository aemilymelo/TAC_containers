package br.edu.utfpr.api.controller;

import br.edu.utfpr.api.dto.TipoDadoDTO;
import br.edu.utfpr.api.model.TipoDado;
import br.edu.utfpr.api.service.TipoDadoService;
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

@Tag(name = "Tipo Dado", description = "Recurso para gerenciamento de tipos de dados climáticos")
@RestController
@RequestMapping(value = "/tipodado", produces = "application/json")
@SecurityRequirement(name = "bearerAuth")

public class TipoDadoController extends ViewImpl<TipoDado, Long> {

    public TipoDadoController(TipoDadoService service) {
        super(service);
    }

    // ✅ Criar Tipo de Dado
    @Operation(summary = "Criar tipo de dado", description = "Cria um novo tipo de dado no sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tipo de dado criado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TipoDado.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/dto")
    public ResponseEntity<TipoDado> criarTipoDado(@RequestBody @Valid TipoDadoDTO dto) {
        TipoDado tipoDado = dto.toEntity();
        return service.save(tipoDado); // Salvar o TipoDado usando o service
    }
}
