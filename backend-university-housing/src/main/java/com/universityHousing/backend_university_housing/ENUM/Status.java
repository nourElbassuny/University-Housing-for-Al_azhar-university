package com.universityHousing.backend_university_housing.ENUM;

public enum Status {
    UNDER_REVIEW("Under Review"),
    ACCEPTED("Accepted"),
    REJECTED("Rejected");
    private final String displayName;

    Status(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
    @Override
    public String toString() {
        return displayName;
    }

}
