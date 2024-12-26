package com.example.proj2.entity;

import com.example.proj2.entity.type.Exercise;
import com.example.proj2.entity.type.Nutrition;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;


@Entity
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private AppUser appUser;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;
    private double sleep;
    private double water;
    @Embedded
    private Exercise exercise;
    @Embedded
    private Nutrition nutrition;

    public Goal() {
    }

    public Goal(Integer id,  Date createdAt, double sleep, double water, Exercise exercise, Nutrition nutrition) {
        this.id = id;

        this.createdAt = createdAt;
        this.sleep = sleep;
        this.water = water;
        this.exercise = exercise;
        this.nutrition = nutrition;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AppUser getUser() {
        return appUser;
    }

    public void setUser(AppUser appUser) {
         this.appUser = appUser;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public double getSleep() {
        return sleep;
    }

    public void setSleep(double sleep) {
        this.sleep = sleep;
    }

    public double getWater() {
        return water;
    }

    public void setWater(double water) {
        this.water = water;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Nutrition getNutrition() {
        return nutrition;
    }

    public void setNutrition(Nutrition nutrition) {
        this.nutrition = nutrition;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id=" + id +
                ", user=" + appUser +
                ", createdAt=" + createdAt +
                ", sleep=" + sleep +
                ", water=" + water +
                ", exercise=" + exercise +
                ", nutrition=" + nutrition +
                '}';
    }
}
