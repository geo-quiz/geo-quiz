import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IQuestion } from '@/utility/interfaces/IQuestion';
import type { IAnswer } from '@/utility/interfaces/IAnswer';

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

    function resetQuestions() {
        questions.value = [];
        currentQuestionIndex.value = 0;
    }

    const answers = ref<IAnswer[]>([]);

    function setAnswer(selectedAnswer: IAnswer) {
        answers.value.push(selectedAnswer);
    }

    function resetAnswers() {
        answers.value = [];
    }

    return {
        questions,
        currentQuestionIndex,
        currentQuestion,
        setQuestions,
        nextQuestion,
        resetQuestions,
        answers,
        setAnswer,
        resetAnswers,
    };
});
