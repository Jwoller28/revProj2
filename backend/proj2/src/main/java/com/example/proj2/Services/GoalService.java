package com.example.proj2.Services;

import com.example.proj2.entity.Goal;
import com.example.proj2.entity.type.Exercise;
import com.example.proj2.entity.type.Nutrition;
import com.example.proj2.repositories.GoalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {
    @Autowired
    GoalRepository goalRepository;
    private static final Logger logger = LoggerFactory.getLogger(GoalService.class);
    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public Goal createGoal(Goal goal) throws Exception {
        return goalRepository.save(goal);
    }

    public Goal getUsersGoal(Integer userId) throws Exception {
        logger.error("Attempting to get the query the goal "+userId);
        Optional<Goal> goal = goalRepository.findMostRecent(userId);
        if (goal.isPresent()){
            logger.error(" query successful "+goal.get());
            return goal.get();}
        else
            throw new Exception();
    }

    public List<Goal> getAllGoalsbyUser(int userId)
        {
            Optional<List<Goal>> goals = goalRepository.findAllByAppUserId(userId);

            if(goals.isPresent()){

                return goals.get();
            }
            else
                return null;
        }

    
    
    public Goal getByGoalId(Integer goalId) throws Exception {
        Optional<Goal> goal = goalRepository.findById(goalId);

        if (goal.isPresent())
            return goal.get();
        else
            throw new Exception();
    }

    public int UpdatedGoalAllById(Integer goalID,Goal goal) {
        logger.info("Finding existing Goal with data: " + goal);

        Optional<Goal> existingGoalOptional = goalRepository.findMostRecent(goalID);

        if (existingGoalOptional.isPresent()) {
            Goal existingGoal = existingGoalOptional.get();

            // Update Nutrition fields if Nutrition is present
            if (goal.getNutrition() != null)


            {
                if (existingGoal.getNutrition() == null) {
                    logger.warn("Initializing Nutrition for Goal ID: " + goalID);
                    existingGoal.setNutrition(new Nutrition());
                }
                Nutrition newNutrition = goal.getNutrition();
                Nutrition existingNutrition = existingGoal.getNutrition();

                if (existingNutrition != null) {
                    if (newNutrition.getKal() > 0.01) existingNutrition.setKal(newNutrition.getKal());
                    if (newNutrition.getCarb() > 0.01) existingNutrition.setCarb(newNutrition.getCarb());
                    if (newNutrition.getFat() > 0.01) existingNutrition.setFat(newNutrition.getFat());
                    if (newNutrition.getWeight() > 0.01) existingNutrition.setWeight(newNutrition.getWeight());
                    if (newNutrition.getProtein() > 0.01) existingNutrition.setProtein(newNutrition.getProtein());
                    if(newNutrition.getNutritionDate()!=null)
                       existingNutrition.setNutritionDate(newNutrition.getNutritionDate());
                } else {
                    logger.warn("Nutrition is null for Goal ID: " + goalID);
                }
            }

            //
            if (goal.getExercise() != null) {
                if (existingGoal.getExercise() == null) {
                    logger.warn("Initializing Nutrition for Goal ID: " + goalID);
                    existingGoal.setExercise(new Exercise());
                }
                Exercise newExercise = goal.getExercise();
                Exercise existingExercise = existingGoal.getExercise();

                if (existingExercise != null) {
                    if (newExercise.getCaloriesBurned() > 0.01)
                        existingExercise.setCaloriesBurned(newExercise.getCaloriesBurned());
                    if (newExercise.getDuration() > 0.01)
                        existingExercise.setDuration(newExercise.getDuration());
                    if (newExercise.getVolume() > 0.01)
                        existingExercise.setVolume(newExercise.getVolume());
                    if(newExercise.getExerciseDate()!=null)
                      existingExercise.setExerciseDate(newExercise.getExerciseDate());
                } else {
                    logger.warn("Exercise is null for Goal ID: " + goalID);
                }
            }

            // Update other fields
            if (goal.getSleep() > 0.01) existingGoal.setSleep(goal.getSleep());
            if (goal.getWater() > 0.01) existingGoal.setWater(goal.getWater());

            if (goal.getSleepDate() != null) {
                existingGoal.setSleepDate(goal.getSleepDate());
            }
            if (goal.getWaterDate() != null) {
                existingGoal.setWaterDate(goal.getWaterDate());
            }


            // Save the updated Goal
            goalRepository.save(existingGoal);
            return 1; // Indicate success
        } else {
            logger.warn("Goal not found for ID: " + goalID);
            return 0; // Goal not found
        }}


    public void deleteGoal(Integer goalId) throws Exception {
        Optional<Goal> existing = goalRepository.findById(goalId);
        if (existing.isPresent()) {
            goalRepository.deleteById(goalId);
        } else {
            throw new Exception("Goal not found");
        }
    }

    public boolean resetGoalsForUser(Integer userId) {
        Optional<List<Goal>> userGoalsOpt = goalRepository.findAllByAppUserId(userId);
        if (userGoalsOpt.isPresent()) {
            List<Goal> userGoals = userGoalsOpt.get();
            for (Goal goal : userGoals) {
                goalRepository.delete(goal);   
            }
            return true;
        }
        return false;
    }



}
