package com.prueba.springboot.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "nombre", nullable = false)
	private String nombre;

	@Column(name = "activo", nullable = false)
	private char activo;

	@OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "rol_id", referencedColumnName = "id")
	private Rol rol_id;

	public Usuario(String nombre, char activo, Rol rol_id) {
		super();
		this.nombre = nombre;
		this.activo = activo;
		this.rol_id = rol_id;
	}

	public Usuario() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public char getActivo() {
		return activo;
	}

	public void setActivo(char activo) {
		this.activo = activo;
	}

	public Rol getRol_id() {
		return rol_id;
	}

	public void setRol_id(Rol rol_id) {
		this.rol_id = rol_id;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nombre=" + nombre + ", activo=" + activo + ", rol_id=" + rol_id + "]";
	}
	
}
