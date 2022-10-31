import type { Ref } from 'vue';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IQuestion } from '@/utility/interfaces/IQuestion';

export const useUserAnswerStore = defineStore('userAnswers', () => {
    /**
     * The first number represents the ID of the question.
     * The second number represents the ID of the answer.
     */
    const answers = ref<Map<number, number>>(new Map<number, number>());

    const questions: Ref<IQuestion[]> = ref([]);

    const score = ref(0);

    function addAnswer(questionId: number, answerId: number) {
        answers.value.set(questionId, answerId);
    }

    function clearAnswers() {
        answers.value.clear();
    }

    function addQuestion(question: IQuestion) {
        questions.value.push(question);
    }

    function clearQuestions() {
        questions.value.forEach(() => questions.value.pop());
    }

    return {
        answers,
        questions,
        score,
        addAnswer,
        clearAnswers,
        addQuestion,
        clearQuestions,
    };
});
