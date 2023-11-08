package com.example.demo.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class CarsService {

    @Autowired
    private CarRepository carRepository;

    public List<Cars> getCars(){
        return carRepository.findAll();//we want this to come from database
    }
    public void insertCar(Cars car){
        Cars carObj=carRepository.findByName(car.getName());
        if(carObj==null){
            carRepository.save(car);
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Server not responding properly or Car already Present!");
        }

    }
    public void deleteCar(String name){
        Cars carObj=carRepository.findByName(name);
        if(carObj!=null){
            carRepository.deleteById(carObj.getId());
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cant find Car or Server not Responding Properly");
        }

    }
    public void updateCar(Long id,Cars car){
        if(carRepository.existsById(id)){
            Cars carObj=carRepository.getReferenceById(id);
            if(car.getName()!=null ){
                carObj.setName(car.getName());}
            if(car.getServiceInterval()!=null ){
                carObj.setServiceInterval(car.getServiceInterval());}
            carRepository.save(carObj);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cant find Car or Server not Responding Properly");
        }

    }
    public Cars getCar(String name){
        Cars carObj=carRepository.findByName(name);
        if(carObj!=null){
            return carObj;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cant find Car or Server not Responding Properly");
        }


    }


}
