package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "state")
public class States {
    @Id
    private Integer id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "governorate_id")
    private Governorates governorates;
}
