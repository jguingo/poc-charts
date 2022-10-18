import { Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { IGraphiqueService } from "../interfaces/igraphique-service";
import { IQuestion } from "../interfaces/question";
import { IReponse } from "../interfaces/reponse";

@Inject({
  providedIn: 'root'
})

export abstract class GraphiqueService implements IGraphiqueService {

  abstract transform(data: any): any;

  load(id?: number): Observable<IQuestion> {
    return of({
      title: 'Question 1',
      reponses: [
        { text: 'Oui', count: 200 },
        { text: 'Non', count: 100 },
        { text: 'Peut-être', count: 0 }
      ]
    })
  }

  loadAll(): Observable<IQuestion[]> {
    const questions: IQuestion[] = [
      {
        title: 'Question 1',
        reponses: [
          { text: 'Oui', count: 65 },
          { text: 'Non', count: 35 },
          { text: 'Peut-être', count: 0 }
        ]
      }
    ]

    return of(questions);
  }

  getTotal(reponses: IReponse[]): number {
    const result = reponses
      .map(r => r.count)
      .reduce((prev, current) => prev + current);

    return result;
  }

  getLabel(reponses: IReponse[]): string[] {
    return reponses.map(r => r.text);
  }

  getValues(reponses: IReponse[]): number[] {
    return reponses.map(r => r.count);
  }

}