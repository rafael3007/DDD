import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";

interface StudentProps {
  nome: string;
}

export class Student extends Entity<StudentProps> {
  static create(
    props: StudentProps,
    id?: UniqueEntityID
  ) {
    const student = new Student(
      props,
      id
    );

    return student;
  }

  get nome(){
    return this.props.nome
  }
  
}
