package com.universityHousing.backend_university_housing.error.body;

import java.sql.Timestamp;


public record ErrorBody(Integer code, String message, String detail, Timestamp timestamp){

}

