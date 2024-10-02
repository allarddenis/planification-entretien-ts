import { Application } from "express";
import candidatRoutes from "./candidat/candidat.routes";
import recruteurRoutes from "./recruteur/recruteur.routes";
import entretienRoutes from './entretien/entretien.routes';

export default class Routes {
  constructor(app: Application) {
    app.use("/api/candidat", candidatRoutes);
    app.use("/api/recruteur", recruteurRoutes);
    app.use("/api/entretien", entretienRoutes);
  }
}
