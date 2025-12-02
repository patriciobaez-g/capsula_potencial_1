
export enum Section {
    Login,
    Cover,
    Introduction,
    Activation,
    Development,
    FormativeEvaluation,
    SummativeEvaluation,
    Synthesis,
    Closure,
    Certificate,
}

export interface UserData {
    name: string;
    email: string;
    rut?: string;
}

export interface Answer {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

export interface QuizResults {
    development: Answer[];
    summative: Answer[];
}

export interface MetacognitiveAnswers {
    q1: string;
    q2: string;
    q3: string;
}
