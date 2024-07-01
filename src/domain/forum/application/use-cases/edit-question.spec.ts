import { expect, beforeEach, describe, it } from "vitest";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-1",
      content: "test",
      title: "edit test",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: "test",
      title: "edit test",
    });
  });

  it("should not be able to edit question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: "author-2",
        content: "test",
        title: "edit test",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
