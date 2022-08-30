import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((acc, crs, ind) => {
      acc[crs.id] = crs;
      acc[crs.id].index = ind;
      return acc;
    }, {}),
  };
};
