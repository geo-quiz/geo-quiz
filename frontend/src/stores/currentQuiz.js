import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
export const useCurrentQuizStore = defineStore('currentQuiz', () => {
    const questions = ref([]);
    const currentQuestionIndex = ref(0);
    const currentQuestion = computed(() => {
        return questions.value[currentQuestionIndex.value];
    });
    function setQuestions(newQuestions) {
        questions.value = newQuestions;
    }
    function nextQuestion() {
        currentQuestionIndex.value++;
    }
    return { questions, currentQuestionIndex, currentQuestion, setQuestions, nextQuestion };
});
