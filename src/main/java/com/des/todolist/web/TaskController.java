package com.des.todolist.web;

import com.des.todolist.model.Task;
import com.des.todolist.model.TaskRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Calendar;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class TaskController {

    private final Logger log = LoggerFactory.getLogger(TaskController.class);
    private TaskRepo taskRepository;

    public TaskController(TaskRepo taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    Collection<Task> tasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/task/{id}")
    ResponseEntity<?> getTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/task")
    ResponseEntity<Task> createTask(@Valid @RequestBody Task task) throws URISyntaxException {
        log.info("Request to create task: {}", task);
        Task result = taskRepository.save(task);
        return ResponseEntity.created(new URI("/api/task/" + result.getId()))
                .body(result);
    }

    @PutMapping("/task/{id}")
    ResponseEntity<Task> updateTask(@Valid @RequestBody Task task,@PathVariable Long id) {
        log.info("Request to update task: {}", task);
        log.info(id.toString());
        task.setDateUpdated(Calendar.getInstance().getTime());
        Task result = taskRepository.save(task);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        log.info("Request to delete task: {}", id);
        taskRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
