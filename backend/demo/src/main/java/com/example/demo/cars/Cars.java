package com.example.demo.cars;

import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Entity
@Table
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="car_name",unique = true)
    private String name;
    @Column
    private Float serviceInterval;

    public Cars(){

    }

    public Cars(Long id, String name, Float serviceInterval) {
        this.id = id;
        this.name = name;
        this.serviceInterval = serviceInterval;
    }

    public Cars(String name, Float serviceInterval) {
        this.name = name;
        this.serviceInterval = serviceInterval;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Float getServiceInterval() {
        return serviceInterval;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setServiceInterval(Float serviceInterval) {
        this.serviceInterval = serviceInterval;
    }

    @Override
    public String toString() {
        return "Cars{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", serviceInterval=" + serviceInterval +
                '}';
    }

}
