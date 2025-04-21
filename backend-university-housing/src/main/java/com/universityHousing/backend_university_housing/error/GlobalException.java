package com.universityHousing.backend_university_housing.error;

import com.universityHousing.backend_university_housing.error.body.ErrorBody;
import com.universityHousing.backend_university_housing.error.exception.EmployeeNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalException {


    @ExceptionHandler({EmployeeNotFoundException.class})
    public static ResponseEntity<ErrorBody> handleEmployeeNotFoundException(final EmployeeNotFoundException e) {
        ErrorBody errorBody=new ErrorBody(e.getCode(),e.getMessage(),e.getDescription(),e.getTimestamp());
      return new ResponseEntity<>(errorBody, HttpStatus.CONFLICT);
    }
}
