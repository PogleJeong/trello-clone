import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DragabbleCard from "./DraggableCard";
import { useForm } from 'react-hook-form';

import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;

`

const Area = styled.div<IArea>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color 1s;
    padding: 20px;
`
const InputBox = styled.input`
  width: 95%;
  height: 30px;
  font-size: 18px;
  padding: 0px 5px;
`

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IArea {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

interface IForm {
  toDo: string;
}

// typescript 에서 String 과 string 은 다름.

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({toDo}: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [ // TO_DO, DOING, DONE
        newToDo,  
        ...allBoards[boardId] // 기존값 + 추가할 값
        ],
      }
    });
    setValue("toDo", "");
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputBox 
          {...register("toDo", {required: true})}
          type="text" 
          placeholder={`Add task on ${boardId}`} />
      </Form>

      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area 
            isDraggingOver={snapshot.isDraggingOver} 
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef} 
            {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard 
                key={toDo.id} 
                index={index} 
                toDoId={toDo.id} 
                toDoText={toDo.text}/>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;