import { expect, beforeEach, describe, it } from "vitest";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-1",
      content: "test",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "test",
    });
  });

  it("should not be able to edit answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: "author-2",
        content: "test",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
