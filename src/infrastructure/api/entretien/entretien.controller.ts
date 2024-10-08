import { PlanificationResult } from '@domain/entretien';
import { findEntretienUseCase, createEntretienUseCase, entretienRepository } from '@registry/registry';
import { Request, Response } from 'express';

export default class EntretienController {
  async create(req: Request, res: Response) {
    try {
      const [result, body] = await createEntretienUseCase.execute(req.body);

      switch (result) {
        case PlanificationResult.OK:
          res.status(201).send(body);
          break;
        case PlanificationResult.HORAIRE:
          res.status(400).send({
            message: "Pas les mêmes horaires!"
          });
          break;
        case PlanificationResult.CANDIDAT_PAS_TROUVE:
          res.status(404).send({
            message: `Cannot create Entretien with candidat id=${req.body.candidatId}.`
          });
          break;
        case PlanificationResult.RECRUTEUR_PAS_TROUVE:
          res.status(404).send({
            message: `Cannot create Entretien with recruteur id=${req.body.recruteurId}.`
          });
          break;
        case PlanificationResult.PAS_COMPATIBLE:
          res.status(400).send({
            message: "Pas la même techno"
          });
          break;
        case PlanificationResult.CANDIDAT_TROP_JEUNE:
          res.status(400).send({
            message: "Recruteur trop jeune"
          });
          break;
        default:
          res.status(500).send({
            message: "Some error occurred while creating entretiens."
          });
          break;
      }

    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while creating entretiens."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const entretiens = await entretienRepository.retrieveAll();

      res.status(200).send(entretiens);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving entretiens."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const entretien = await findEntretienUseCase.execute(id);

      if (entretien) res.status(200).send(entretien);
      else
        res.status(404).send({
          message: `Cannot find Entretien with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Entretien with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let entretien = req.body;
    entretien.id = parseInt(req.params.id);

    try {
      const num = await entretienRepository.update(entretien);

      if (num == 1) {
        res.status(204).send({
          message: "Entretien was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Entretien with id=${entretien.id}. Maybe Entretien was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Entretien with id=${entretien.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await entretienRepository.delete(id);

      if (num == 1) {
        res.status(204).send({
          message: "Entretien was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Entretien with id=${id}. Maybe Entretien was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Entretien with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await entretienRepository.deleteAll();

      res.status(204).send({ message: `${num} Entretiens were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all entretiens."
      });
    }
  }
}
