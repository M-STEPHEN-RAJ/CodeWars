const API_URL = "http://localhost:5000"; 

export const fetchQuestions = async () => {
    try {
        const response = await fetch(`${API_URL}/questions`);
        if (!response.ok) {
            throw new Error("Failed to fetch questions");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};
