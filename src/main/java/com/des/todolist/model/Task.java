package com.des.todolist.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "tbl_tasks")
public class Task {


    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private boolean checked;
    private String description;
    private Date dateUpdated;

    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;




}