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
import com.prueba.springboot.model.Rol;
import com.prueba.springboot.repository.RolRepository;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class RolController {

	@Autowired
	private RolRepository rolRepository;

	@GetMapping("/rol")
	public List<Rol> getAllEmployees() {
		return rolRepository.findAll();
	}

	@GetMapping("/rol/{id}")
	public ResponseEntity<Rol> getRolById(@PathVariable(value = "id") Long rolId) throws ResourceNotFoundException {
		Rol rol = rolRepository.findById(rolId).orElseThrow(() -> new ResourceNotFoundException("Rol not found for this id :: " + rolId));
		return ResponseEntity.ok().body(rol);
	}

	@PostMapping("/rol")
	public Rol createRol(@RequestBody Rol rol) {
		return rolRepository.save(rol);
	}

	@PutMapping("/rol/{id}")
	public ResponseEntity<Rol> updateRol(@PathVariable(value = "id") Long rolId, @RequestBody Rol rolDetails) throws ResourceNotFoundException {
		Rol rol = rolRepository.findById(rolId).orElseThrow(() -> new ResourceNotFoundException("Rol not found for this id :: " + rolId));

		rol.setNombre(rolDetails.getNombre());
		final Rol updatedEmployee = rolRepository.save(rol);
		return ResponseEntity.ok(updatedEmployee);
	}

	@DeleteMapping("/rol/{id}")
	public Map<String, Boolean> deleteRol(@PathVariable(value = "id") Long rolId) throws ResourceNotFoundException {
		Rol rol = rolRepository.findById(rolId).orElseThrow(() -> new ResourceNotFoundException("Rol not found for this id :: " + rolId));

		rolRepository.delete(rol);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
