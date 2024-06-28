import { expect } from "vitest";
import { CreateQuestionUseCase } from "./create-question";

import { beforeEach, describe, it } from "vitest";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("create a question", async () => {
    const { question } = await sut.execute({
      content: "New",
      authorId: "1",
      title: "test",
    });


    expect(question.id).toBeTruthy();
  });
});
