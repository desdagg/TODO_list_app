package com.des.todolist;

import com.des.todolist.model.Task;
import com.des.todolist.model.TaskRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


import java.util.Calendar;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final TaskRepo repository;

    public Initializer(TaskRepo repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("lunch", "breakfast", "shopping",
                "picknic","packabalunch").forEach(name -> repository.save(new Task(name)));

        Task tTask = new Task("first");

        tTask.setChecked(true);
        tTask.setDescription("the first one");
        tTask.setDateUpdated(Calendar.getInstance().getTime());

        repository.save(tTask);


        repository.findAll().forEach(System.out::println);
    }
}
