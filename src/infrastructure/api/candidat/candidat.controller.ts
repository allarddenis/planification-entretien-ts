import { 
  CreateCandidatUseCase,
  ListCandidatesUseCase,
  FindCandidatUseCase,
  UpdateCandidatUseCase,
  DeleteCandidatUseCase,
  DeleteAllCandidatesUseCase
} from "@use_case/candidat";
import { SaveResponse, Candidat } from "@domain/candidat";
import { Request, Response } from "express";

export default class CandidatController {

  private createCandidat = new CreateCandidatUseCase();
  private listCandidatesUseCase = new ListCandidatesUseCase();
  private findCandidatUseCase = new FindCandidatUseCase();
  private updateCandidatUseCase = new UpdateCandidatUseCase();
  private deleteCandidatUseCase = new DeleteCandidatUseCase();
  private deleteAllCandidatesUseCase = new DeleteAllCandidatesUseCase();

  async create(req: Request, res: Response) {
    try {
      const [result, body] = await this.createCandidat.execute(req.body);

      switch(result) {
        case SaveResponse.OK:
          res.status(201).send(body);
          break;
        case SaveResponse.EMPTY_CONTENT:
          res.status(400).send({
            message: 'Content can not be empty!'
          });
          break;
      }
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while creating candidats."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const langage = typeof req.query.langage === "string" ? req.query.langage : "";

    try {
      const candidats = await this.listCandidatesUseCase.execute({ email: langage });

      res.status(200).send(candidats);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving candidats."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const candidat = await this.findCandidatUseCase.execute(id);

      if (candidat) res.status(200).send(candidat);
      else
        res.status(404).send({
          message: `Cannot find Candidat with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Candidat with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let candidat: Candidat = req.body;
    candidat.id = parseInt(req.params.id);

    try {
      const num = await this.updateCandidatUseCase.execute(candidat);

      if (num == 1) {
        res.status(204).send({
          message: "Candidat was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Candidat with id=${candidat.id}. Maybe Candidat was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Candidat with id=${candidat.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await this.deleteCandidatUseCase.execute(id);

      if (num == 1) {
        res.status(204).send({
          message: "Candidat was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Candidat with id=${id}. Maybe Candidat was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Candidat with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await this.deleteAllCandidatesUseCase.execute();

      res.status(204).send({ message: `${num} Candidats were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all candidats."
      });
    }
  }
}
