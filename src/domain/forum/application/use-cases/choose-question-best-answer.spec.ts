import { expect, beforeEach, describe, it } from "vitest";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "../../../../../test/factories/make-question";


let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionRepository,inMemoryAnswersRepository);
  });

  it("should be able to choose the question best answer", async () => {
    
    const question = makeQuestion()

    const answer = makeAnswer({
        questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer);


    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    });


    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  });


  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
        authorId: new UniqueEntityID("author-1")
    })

    const answer = makeAnswer({
        questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer);

    expect(()=>{
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: "author-2"
      })
    }).rejects.toBeInstanceOf(Error)

  });
});
