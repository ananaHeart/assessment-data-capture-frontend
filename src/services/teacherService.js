import api from "./api";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

const getMyClasses = async () => {
  const token = getToken();

  const response = await api.get("/classes/my-classes", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const getStudentsByClass = async (classId) => {
  const token = getToken();

  const response = await api.get(`/classes/${classId}/students`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const getAssessmentsByClass = async (classId) => {
  const token = getToken();

  const response = await api.get(`/classes/${classId}/assessments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export default {
  getMyClasses,
  getStudentsByClass,
  getAssessmentsByClass
};