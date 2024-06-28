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
      authorId: "1",
      content: "Conteudo da pergunta",
      title: "Nova Pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id);
  });
});
