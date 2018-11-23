package com.kit.prover.Controller;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<Prover, Integer> {

    //List<Prover> findByUniqueId(String uid);
}
