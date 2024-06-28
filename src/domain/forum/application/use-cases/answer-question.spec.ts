import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../../../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

const fakeAnswersRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    content: "New",
    questionId: "1234",
    instructorId: "1",
  });

  expect(answer.content).toEqual("New");
});
