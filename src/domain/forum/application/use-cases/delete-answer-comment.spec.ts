import { expect, beforeEach, describe, it } from "vitest";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comments-repositories";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "../../../../../test/factories/make-answer-comments";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerCommentUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository
    );
  });

  it("should be able to delete an comment", async () => {
    const AnswerComment = makeAnswerComment();

    await inMemoryAnswerCommentRepository.create(AnswerComment);

    await sut.execute({
      answerCommentId: AnswerComment.id.toString(),
      authorId: AnswerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0);
  });
});
