import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import employeeSlice from "./slices/employeeSlice";
import facultySlice from "./slices/facultySlice";
import lecturerSlice from "./slices/lecturerSlice";
import studentSlice from "./slices/studentSlice";
import subjectSlide from "./slices/subjectSlide";
import classSlice from "./slices/classSlice";
import subclassSlice from "./slices/subclassSlice";
import personSlice from "./slices/personSlice";

const rootReducer = {
    auth: authSlice,
    employee: employeeSlice,
    faculty: facultySlice,
    lecturer: lecturerSlice,
    student: studentSlice,
    subject: subjectSlide,
    class: classSlice,
    subclass: subclassSlice,
    person: personSlice
};

export default configureStore ({
    reducer: rootReducer,
});