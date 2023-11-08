package com.example.demo.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path="api/v1/Cars")
public class CarsController {

@Autowired
private CarsService carsService;

    @GetMapping("/{name}")
    public ResponseEntity<?> getCar(@PathVariable("name") String name){
            return ResponseEntity.ok(carsService.getCar(name));

    }
    @GetMapping
    public ResponseEntity<?> getCars(){
            return ResponseEntity.ok(carsService.getCars());
    }
    @PostMapping
    public ResponseEntity<?> insertCar(@RequestBody Cars car){
            carsService.insertCar(car);
            return ResponseEntity.ok("Successfully Inserted");
    }
    @DeleteMapping
    public ResponseEntity<?> deleteCar(@RequestParam("name") String name){
        carsService.deleteCar(name);
        return ResponseEntity.ok("Successfully Deleted");


    }
@PutMapping
    public ResponseEntity<?> updateCar(@RequestParam("id") Long id,@RequestBody
                           Cars car){

        carsService.updateCar(id,car);
        return ResponseEntity.ok("Updated Successfully");
    }

}
