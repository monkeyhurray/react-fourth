import { useState } from "react";
import { AxiosError } from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getTodo,
  postTodo,
  deleteTodo,
  confirmPatchTodo,
  cancelPatchTodo,
} from "../api/todo";
import {
  Main,
  Input,
  ContentDiv,
  H2Title,
  SemiContentDiv,
  ButtonDiv,
  ConfirmBtn,
} from "../styles/StyledHome";
import uuid from "react-uuid";

interface Todo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Todo, Error, Todo[]>(
    "todos",
    getTodo
  );

  const postMutation = useMutation<void, AxiosError, Todo>(postTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const confirmMutation = useMutation(confirmPatchTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  const cancelMutation = useMutation(cancelPatchTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const newTodo: Todo = {
    id: uuid(),
    title: titleValue,
    content: inputValue,
    isDone: false,
  };

  const onClickAddBtn = () => {
    postMutation.mutate(newTodo);
    setTitleValue("");
    setInputValue("");
  };
  const onClickDeleteBtn = (id: string) => deleteMutation.mutate(id);

  const onClickConfrimBtn = (id: string) =>
    confirmMutation.mutate({ id, isDone: true });

  const onClickCancelBtn = (id: string) =>
    cancelMutation.mutate({ id, isDone: false });

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>오류 발생!!!</div>;
  }
  if (!data) {
    return <div>아직 없습니다.</div>;
  }
  return (
    <Main>
      <Input
        placeholder="제목을 입력해 주세요"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <Input
        placeholder="내용을 입력해 주세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onClickAddBtn}>추가하기</button>

      <H2Title>Todos...</H2Title>
      {data.map((item) => {
        if (item.isDone !== true) {
          return (
            <ContentDiv key={item.id}>
              <SemiContentDiv>제목:&nbsp;{item.title}</SemiContentDiv>
              오늘 할 일:&nbsp;
              <SemiContentDiv> {item.content}</SemiContentDiv>
              <ButtonDiv>
                <ConfirmBtn onClick={() => onClickConfrimBtn(item.id)}>
                  확인
                </ConfirmBtn>
                <ConfirmBtn onClick={() => onClickDeleteBtn(item.id)}>
                  삭제
                </ConfirmBtn>
              </ButtonDiv>
            </ContentDiv>
          );
        }
        return <div key={item.id}></div>;
      })}

      <H2Title>Done...</H2Title>
      {data.map((item) => {
        if (item.isDone) {
          return (
            <ContentDiv key={item.id}>
              <SemiContentDiv>제목:&nbsp;{item.title}</SemiContentDiv>
              해결한 일:&nbsp; <SemiContentDiv>{item.content}</SemiContentDiv>
              <ButtonDiv>
                <ConfirmBtn onClick={() => onClickCancelBtn(item.id)}>
                  취소
                </ConfirmBtn>
                <ConfirmBtn onClick={() => onClickDeleteBtn(item.id)}>
                  삭제
                </ConfirmBtn>
              </ButtonDiv>
            </ContentDiv>
          );
        }
        return <div key={item.id}></div>;
      })}
    </Main>
  );
};

export default Home;
