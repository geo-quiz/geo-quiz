import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IQuestion } from '../../../utility/interfaces/IQuestion';

export const useCurrentQuizStore = defineStore('currentQuiz', () => {
    const questions = ref<IQuestion[]>([]);
    const currentQuestionIndex = ref(0);
    const currentQuestion = computed<IQuestion>(() => {
        return questions.value[currentQuestionIndex.value];
    });

    function setQuestions(newQuestions: IQuestion[]) {
        questions.value = newQuestions;
    }

    function nextQuestion() {
        currentQuestionIndex.value++;
    }
    return { questions, currentQuestionIndex, currentQuestion, setQuestions, nextQuestion };
});
