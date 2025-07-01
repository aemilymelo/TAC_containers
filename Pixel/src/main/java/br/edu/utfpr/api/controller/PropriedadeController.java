package br.edu.utfpr.api.controller;

import br.edu.utfpr.api.dto.PropriedadeDTO;
import br.edu.utfpr.api.model.Propriedade;
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

@Tag(name = "Propriedade", description = "Recurso para gerenciamento de propriedades")
@RestController
@RequestMapping("/propriedades")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PropriedadeController extends ViewImpl<Propriedade, Long> {

    private final PropriedadeService service;

    public PropriedadeController(PropriedadeService service) {
        super(service);
        this.service = service;
    }

    // ✅ Criar Propriedade
    @Operation(summary = "Criar propriedade", description = "Cria uma nova propriedade no sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Propriedade criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Propriedade.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/dto")
    public ResponseEntity<Propriedade> criarPropriedade(@RequestBody @Valid PropriedadeDTO dto) {
        Propriedade propriedade = dto.toEntity();
        return service.save(propriedade);
    }
}
