import { Recruteur } from "@domain/recruteur";
import { SaveRecruteurResult } from "@domain/recruteur";
import { createRecruteurUseCase, deleteAllRecrutersUseCase, deleteRecruteurUseCase, findRecruiterUseCase, listRecrutersUseCase, updateRecruteurUseCase } from "@registry/registry";
import { Request, Response } from "express";

export default class RecruteurController {

  async create(req: Request, res: Response) {
    try {
      const [result, body] = await createRecruteurUseCase.execute(req.body);

      switch(result) {
        case SaveRecruteurResult.OK:
          res.status(201).send(body);
          break;
        case SaveRecruteurResult.EMPTY_CONTENT:
          res.status(400).send({
            message: 'Content can not be empty!'
          });
          break;
      }
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while creating recruteurs."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const langage = typeof req.query.langage === "string" ? req.query.langage : "";

    try {
      const recruteurs = await listRecrutersUseCase.execute({ email: langage });

      res.status(200).send(recruteurs);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving recruteurs."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const recruteur = await findRecruiterUseCase.execute(id);

      if (recruteur) res.status(200).send(recruteur);
      else
        res.status(404).send({
          message: `Cannot find Recruteur with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Recruteur with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let recruteur: Recruteur = req.body;
    recruteur.id = parseInt(req.params.id);

    try {
      const num = await updateRecruteurUseCase.execute(recruteur);

      if (num == 1) {
        res.status(204).send({
          message: "Recruteur was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Recruteur with id=${recruteur.id}. Maybe Recruteur was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Recruteur with id=${recruteur.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await deleteRecruteurUseCase.execute(id);

      if (num == 1) {
        res.status(204).send({
          message: "Recruteur was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Recruteur with id=${id}. Maybe Recruteur was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Recruteur with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await deleteAllRecrutersUseCase.execute();

      res.status(204).send({ message: `${num} Recruteurs were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all recruteurs."
      });
    }
  }
}
