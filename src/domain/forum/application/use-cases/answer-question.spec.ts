import { beforeEach, describe, it } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";
import { expect } from "vitest";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("Create an answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("create an answer", async () => {
    const { answer } = await sut.execute({
      content: "New",
      questionId: "1",
      instructorId: "1",
    });

   
    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id);
  });
});
