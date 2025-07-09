package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="registration_status")
public class RegistrationStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean isOpen;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt=LocalDateTime.now();
}
