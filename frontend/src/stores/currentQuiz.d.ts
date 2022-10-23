import type { IQuestion } from '@/utility/interfaces/IQuestion';
export declare const useCurrentQuizStore: import("pinia").StoreDefinition<"currentQuiz", import("pinia")._UnwrapAll<Pick<{
    questions: import("vue").Ref<{
        id: number;
        question: string;
        answers: {
            id: number;
            answer: string;
        }[];
        correctAnswer: number;
        continent: import("../utility/enums/EContinent").EContinent;
    }[]>;
    currentQuestionIndex: import("vue").Ref<number>;
    currentQuestion: import("vue").ComputedRef<IQuestion>;
    setQuestions: (newQuestions: IQuestion[]) => void;
    nextQuestion: () => void;
}, "questions" | "currentQuestionIndex">>, Pick<{
    questions: import("vue").Ref<{
        id: number;
        question: string;
        answers: {
            id: number;
            answer: string;
        }[];
        correctAnswer: number;
        continent: import("../utility/enums/EContinent").EContinent;
    }[]>;
    currentQuestionIndex: import("vue").Ref<number>;
    currentQuestion: import("vue").ComputedRef<IQuestion>;
    setQuestions: (newQuestions: IQuestion[]) => void;
    nextQuestion: () => void;
}, "currentQuestion">, Pick<{
    questions: import("vue").Ref<{
        id: number;
        question: string;
        answers: {
            id: number;
            answer: string;
        }[];
        correctAnswer: number;
        continent: import("../utility/enums/EContinent").EContinent;
    }[]>;
    currentQuestionIndex: import("vue").Ref<number>;
    currentQuestion: import("vue").ComputedRef<IQuestion>;
    setQuestions: (newQuestions: IQuestion[]) => void;
    nextQuestion: () => void;
}, "setQuestions" | "nextQuestion">>;
