import { InjectionToken } from "@angular/core";
import { IGraphiqueService } from "../interfaces/igraphique-service";

export const GRAPHIQUE_SERVICE = new InjectionToken<IGraphiqueService>("graphiqueService")