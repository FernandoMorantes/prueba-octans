package com.prueba.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prueba.springboot.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long>{

}
