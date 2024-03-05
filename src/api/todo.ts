import axios from "axios";
interface NewTodo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}
interface Payload {
  id: string;
  isDone: boolean;
}
const getTodo = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  return response.data;
};

const postTodo = async (newTodo: NewTodo): Promise<void> => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
};

const confirmPatchTodo = async (payload: Payload): Promise<void> => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

const cancelPatchTodo = async (payload: Payload): Promise<void> => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodo, postTodo, deleteTodo, confirmPatchTodo, cancelPatchTodo };
