package com.universityHousing.backend_university_housing.dto;

import java.util.Date;


public record StudentDTO(int id, String email, String arabicName, String englishName, String phone, String gender, Date birthday, String state, String address, String colleague, String department, String grade, String stage, String governorate, String status, String nationalId){
   public StudentDTO(int id,String email, String arabicName, String englishName, String phone, String gender, String colleague, String stage,  String governorate) {
         this(id,email,arabicName,englishName,phone,gender,null,null,null,colleague,null,null,stage,governorate,null,null);
     }
}

