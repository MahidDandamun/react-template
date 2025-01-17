import api from "../../api/api";

export const fetchWorkflow = async (workflowName: string) => {
  try {
    const response = await api.get(`resource/Workflow/${workflowName}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching workflow:", error);
  }
};
