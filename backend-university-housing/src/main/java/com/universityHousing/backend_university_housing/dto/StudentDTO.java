package com.universityHousing.backend_university_housing.dto;

import java.util.Date;


public record StudentDTO(int id, String name, String email, String phone, String gender, Date birthday, String city, String address, String colleague, String department, String grade, String stage, String governorate, String status, String nationalId){
   public StudentDTO(int id, String name, String email, String phone, String gender, String colleague, String stage,  String governorate) {
         this(id,name,email,phone,gender,null,null,null,colleague,null,null,stage,governorate,null,null);
     }

}

