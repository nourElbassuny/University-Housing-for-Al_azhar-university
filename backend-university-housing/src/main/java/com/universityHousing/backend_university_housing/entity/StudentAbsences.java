package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Studentabsences")
public class StudentAbsences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "start_date",columnDefinition = "DATE")
    private LocalDate startDate;
    @Column(name = "end_date",columnDefinition = "DATE")
    private LocalDate endDate;
    private String reason;


    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
