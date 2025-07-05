package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.ColleagueRepository;
import com.universityHousing.backend_university_housing.dao.DepartmentRepository;
import com.universityHousing.backend_university_housing.dao.governorate.GovernoratesRepo;
import com.universityHousing.backend_university_housing.dao.state.StatesRepository;
import com.universityHousing.backend_university_housing.entity.Colleague;
import com.universityHousing.backend_university_housing.entity.Department;
import com.universityHousing.backend_university_housing.entity.Governorates;
import com.universityHousing.backend_university_housing.entity.States;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonService {
    private final GovernoratesRepo governoratesRepo;
    private final StatesRepository statesRepository;
    private final ColleagueRepository colleagueRepository;
    private final DepartmentRepository departmentRepository;

    public List<Colleague>getAllColleagues(){
        return colleagueRepository.findAll();
    }
    public List<Department>findDepartmentByColleagueId(Integer colleagueId) {
        return departmentRepository.findDepartmentByColleagueId(colleagueId);
    }

    public List<States>getAllStatesByGovernorateId(int governorateId){
        return statesRepository.findStatesByGovernoratesId(governorateId);
    }
    public List<Governorates> getAllGovernorates() {
        return governoratesRepo.findAll();
    }
}
