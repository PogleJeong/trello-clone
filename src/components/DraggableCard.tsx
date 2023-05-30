import React from 'react';
import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";


const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "tomato" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.1)" : "none" };
`;

interface IDraggableCard{
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableCard({toDoId, toDoText, index}:IDraggableCard) {
    return(
        <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
            <Card
            isDragging={snapshot.isDragging}
                ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
            >
                {toDoText}
            </Card>
        )}
        </Draggable>
    );
}

// performance : props 가 변하지 않는 경우 이외의 리랜더링 제한
// 주로 api 등에도 사용됨.
export default React.memo(DraggableCard);