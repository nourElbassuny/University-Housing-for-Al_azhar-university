package com.universityHousing.backend_university_housing.ENUM;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    STUDENT_READ("admin:read"),
    STUDENT_UPDATE("admin:update"),
    STUDENT_CREATE("admin:create"),
    STUDENT_DELETE("admin:delete");

    @Getter
    private final String permission;
}
