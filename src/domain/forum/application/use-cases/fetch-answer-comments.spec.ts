import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { FetchAnswerComments } from "./fetch-answer-comments";
import { makeAnswerComment } from "../../../../../test/factories/make-answer-comments";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comments-repositories";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswerComments;

describe("Fetch Recent AnswerComments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new FetchAnswerComments(inMemoryAnswerCommentRepository);
  });

  it("should be able to fetch recent Answer Comments", async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("Answer-1"),
      })
    );
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("Answer-1"),
      })
    );
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("Answer-1"),
      })
    );

    const { answerComments } = await sut.execute({
      answerId: "Answer-1",
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
  });

  it("should be able to fetch paginated Answer comments ", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID("Answer-1"),
        })
      );
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: "Answer-1",
    });

    expect(answerComments).toHaveLength(2);
  });
});
