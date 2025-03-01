import axios from 'axios';

interface Task {
    id: number;
    title: string;
    status: string;
}

export const allTasks = async () => {
    const response = await axios.get('http://localhost:8000/api/tasks/all'); 
    return response.data;
};