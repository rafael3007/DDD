import { expect, beforeEach, describe, it } from "vitest";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    console.log(inMemoryQuestionsRepository.items);

    await sut.execute({
      questionId: "question-1",
    });

    console.log(inMemoryQuestionsRepository.items);

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });
});
