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
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1")
    }, new UniqueEntityID("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);


    await sut.execute({
      questionId: "question-1",
      authorId: "author-1"
    });


    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });


  it("should not be able to delete question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1")
    }, new UniqueEntityID("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(()=>{
      return sut.execute({
        questionId: "question-1",
        authorId: "author-2"
      })
    }).rejects.toBeInstanceOf(Error)

  });
});
