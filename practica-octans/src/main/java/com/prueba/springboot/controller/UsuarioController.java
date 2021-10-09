package com.prueba.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.springboot.exception.ResourceNotFoundException;
import com.prueba.springboot.model.Usuario;
import com.prueba.springboot.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping("/usuario")
	public List<Usuario> getAllUsuarios() {
		return usuarioRepository.findAll();
	}

	@GetMapping("/usuario/{id}")
	public ResponseEntity<Usuario> getUsuarioById(@PathVariable(value = "id") Long usuarioId) throws ResourceNotFoundException {
		Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResourceNotFoundException("Usuario not found for this id :: " + usuarioId));
		return ResponseEntity.ok().body(usuario);
	}

	@PostMapping("/usuario")
	public Usuario createUsuario(@RequestBody Usuario usuario) {
		List<Usuario> usuarios = this.getAllUsuarios();
		
		for (Usuario usuarioLista : usuarios) { 
		    if(usuarioLista.getNombre().equals(usuario.getNombre())) {
		    	return (Usuario) ResponseEntity.badRequest();
		    }
		}
		
		return usuarioRepository.save(usuario);
	}

	@PutMapping("/usuario/{id}")
	public ResponseEntity<Usuario> updateUsuario(@PathVariable(value = "id") Long usuarioId, @RequestBody Usuario usuarioDetails) throws ResourceNotFoundException {
		Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResourceNotFoundException("Usuario not found for this id :: " + usuarioId));

		usuario.setNombre(usuarioDetails.getNombre());
		usuario.setActivo(usuarioDetails.getActivo());
		usuario.setRol_id(usuarioDetails.getRol_id());
		
		final Usuario updatedEmployee = usuarioRepository.save(usuario);
		return ResponseEntity.ok(updatedEmployee);
	}

	@DeleteMapping("/usuario/{id}")
	public Map<String, Boolean> deleteUsuario(@PathVariable(value = "id") Long usuarioId) throws ResourceNotFoundException {
		Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResourceNotFoundException("Usuario not found for this id :: " + usuarioId));

		usuarioRepository.delete(usuario);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
