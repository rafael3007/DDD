import { Entity } from "../core/entities/entity";

interface StudentProps {
  nome: string;
}

export class Student extends Entity<StudentProps> {

}
