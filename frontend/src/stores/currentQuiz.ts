import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IQuestion } from '@/utility/interfaces/IQuestion';
import type { IAnswer } from '@/utility/interfaces/IAnswer';

export const useCurrentQuizStore = defineStore('currentQuiz', () => {
    const timeLeft = ref(15);
    const totalTime = ref(150);
    const points = ref(0);
    const questions = ref<IQuestion[]>([]);
    const currentQuestionIndex = ref(0);
    const currentQuestion = computed<IQuestion>(() => {
        return questions.value[currentQuestionIndex.value];
    });
    const currentContinent = ref('');

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

    function incrementPoints() {
        points.value++;
    }

    function resetPoints() {
        points.value = 0;
    }

    function resetTime() {
        totalTime.value = totalTime.value - timeLeft.value;
        timeLeft.value = 15;
    }

    function decreaseTime() {
        timeLeft.value--;
    }

    function resetTotalTime() {
        totalTime.value = 150;
    }

    function setCurrentContinent(continent: string) {
        currentContinent.value = continent;
    }

    return {
        questions,
        currentQuestionIndex,
        currentQuestion,
        currentContinent,
        setCurrentContinent,
        setQuestions,
        nextQuestion,
        resetQuestions,
        answers,
        setAnswer,
        resetAnswers,
        incrementPoints,
        points,
        resetPoints,
        timeLeft,
        resetTime,
        decreaseTime,
        totalTime,
        resetTotalTime,
    };
});
