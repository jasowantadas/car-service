package com.example.demo.cars;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

//This fle responsible for data access
@Repository
public interface CarRepository extends JpaRepository<Cars,Long> {
    @Query(value = "SELECT * FROM cars  WHERE car_name = ?1", nativeQuery = true)
    Cars findByName(String name);

}
