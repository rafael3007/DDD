import { AnswerRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {

  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if(authorId !== answer.authorId.toString()){
      throw new Error("Not allowed.");
    }

    answer.content = content
  
    await this.answerRepository.save(answer);

    return {}
  }
}
