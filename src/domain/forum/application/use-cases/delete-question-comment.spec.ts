import { expect, beforeEach, describe, it } from "vitest";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comments-repositories";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestionComment } from "../../../../../test/factories/make-question-comment";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionCommentUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionCommentUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    );
  });

  it("should be able to delete an comment", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentRepository.create(questionComment);

    

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    });

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0);
  });

});
