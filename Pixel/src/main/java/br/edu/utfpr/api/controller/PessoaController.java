package br.edu.utfpr.api.controller;

import br.edu.utfpr.api.dto.PessoaDTO;
import br.edu.utfpr.api.model.Pessoa;
import br.edu.utfpr.api.service.PessoaService;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "Pessoa", description = "Recurso para gerenciamento de pessoas")
@RestController
@RequestMapping(value = "/pessoa", produces = "application/json")
@SecurityRequirement(name = "bearerAuth")

public class PessoaController extends ViewImpl<Pessoa, Long> {

   public PessoaController(PessoaService service) {
      super(service);
   }

   // ✅ Criar Pessoa
   @Operation(summary = "Criar pessoa", description = "Cria uma nova pessoa no sistema.")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "200", description = "Pessoa criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Pessoa.class))),
         @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos", content = @Content(mediaType = "application/json"))
   })
   @PostMapping("/dto")
   public ResponseEntity<Pessoa> criarPessoa(@RequestBody @Valid PessoaDTO dto) {
      Pessoa pessoa = dto.toEntity();
      return service.save(pessoa);
   }
}
