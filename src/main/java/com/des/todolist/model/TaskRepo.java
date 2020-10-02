package com.des.todolist.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task, Long> {
    Task findByName(String name);

    Task findById(int id);
}
