import { atom, selector } from 'recoil';

// typescript 에게 toDoState 의 데이터값 아려주기
interface IToDoState {
    [key: string]: IToDo[];
}

export interface IToDo {
    id: number;
    text: string;
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To_Do": [],
        Doing: [],
        Done: [],
    }
})