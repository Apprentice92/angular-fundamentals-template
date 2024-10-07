import { Course, CourseDTO } from "@app/services/course-info";
import { Action, createReducer, on } from "@ngrx/store";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestDeleteCourseSuccess,
  requestEditCourse,
  requestEditCourseFail,
  requestEditCourseSuccess,
  requestFilteredCourses,
  requestFilteredCoursesFail,
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from "./courses.actions";

export interface CoursesState {
  allCourses: CourseDTO[];
  course: CourseDTO;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: {} as CourseDTO,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: "",
};

const convertCourseToDTO = (course: Course): CourseDTO => ({
    ...course,
    authors: course.authors?.map((authorId: string) => ({ id: authorId, name: '' })) || [], // Convert author IDs to Author objects
  });

export const coursesReducer = createReducer(
  initialState,
  on(requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),
  on(requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(requestSingleCourse, (state, { id }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
  })),
  on(requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),
  on(requestFilteredCourses, (state, { title }) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),
  on(requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(requestDeleteCourse, (state, { id }) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),
  on(requestDeleteCourseSuccess, (state, { id }) => ({
    ...state,
    allCourses: state.allCourses.filter((course) => course.id !== id),
    isAllCoursesLoading: false,
  })),
  on(requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(requestEditCourse, (state, { id, course }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map(c => c.id === course.id ? convertCourseToDTO(course) : c),
    isSingleCourseLoading: false,
  })),
  on(requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),
  on(requestCreateCourse, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    isSingleCourseLoading: false,
  })),
  on(requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  }))
);
export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);

export const coursesFeatureKey = "courses";