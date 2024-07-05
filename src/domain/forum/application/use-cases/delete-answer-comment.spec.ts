import { expect, beforeEach, describe, it } from "vitest";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comments-repositories";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "../../../../../test/factories/make-answer-comments";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository);
  });

  it("should be able to delete an comment", async () => {
    const AnswerComment = makeAnswerComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswerCommentRepository.create(AnswerComment);

    const result = await sut.execute({
      answerCommentId: AnswerComment.id.toString(),
      authorId: AnswerComment.authorId.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
