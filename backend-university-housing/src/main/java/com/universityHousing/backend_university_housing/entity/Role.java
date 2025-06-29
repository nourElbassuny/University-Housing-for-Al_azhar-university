package com.universityHousing.backend_university_housing.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.universityHousing.backend_university_housing.entity.Permission.*;

@RequiredArgsConstructor
public enum Role {
    STUDENT(Set.of(
            STUDENT_CREATE,
            STUDENT_DELETE,
            STUDENT_READ,
            STUDENT_UPDATE
    )),
    ADMIN(Set.of(
                    ADMIN_READ,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    ADMIN_UPDATE,
                    STUDENT_CREATE,
                    STUDENT_DELETE,
                    STUDENT_READ,
                    STUDENT_UPDATE
            )
    );
    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities(){
        var authorities= getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return authorities;
    }
}
