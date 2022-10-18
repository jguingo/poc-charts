import { Observable } from "rxjs";
import { IQuestion } from "./question";

export interface IGraphiqueService  {
  loadAll(): Observable<IQuestion[]>;
  load(id  : number): Observable<IQuestion>;
  transform(data: IQuestion): any;
}