import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comments-repositories";
import { FetchQuestionComments } from "./fetch-question-comments";
import { makeQuestionComment } from "../../../../../test/factories/make-question-comment";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: FetchQuestionComments;

describe("Fetch Recent QuestionComments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    sut = new FetchQuestionComments(inMemoryQuestionCommentRepository);
  });

  it("should be able to fetch recent question Comments", async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    );

    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question comments ", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-1"),
        })
      );
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(questionComments).toHaveLength(2);
  });
});
