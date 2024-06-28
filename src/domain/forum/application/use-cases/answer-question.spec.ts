import { expect } from "vitest";
import { CreateQuestionUseCase } from "./create-question";

import { beforeEach, describe, it } from "node:test";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("create an answer", async () => {
    const { answer } = await sut.execute({
      content: "New",
      questionId: "1234",
      instructorId: "1",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id);
  });
});
