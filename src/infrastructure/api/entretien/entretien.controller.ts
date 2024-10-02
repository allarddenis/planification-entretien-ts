import { CreateEntretienUseCase } from '@use_case/entretien';
import { CreationResult } from '@domain/entretien';
import { Request, Response } from 'express';
import registry from '@registry/registry';

export default class EntretienController {

  private createEntretienUseCase = new CreateEntretienUseCase();
  private entretienRepository = registry.repositories.entretienRepository;

  async create(req: Request, res: Response) {
    try {
      const [result, body] = await this.createEntretienUseCase.execute(req.body);

      switch (result) {
        case CreationResult.OK:
          res.status(201).send(body);
          break;
        case CreationResult.HORAIRE:
          res.status(400).send({
            message: "Pas les mêmes horaires!"
          });
          break;
        case CreationResult.CANDIDAT_PAS_TROUVE:
          res.status(404).send({
            message: `Cannot create Entretien with candidat id=${req.body.candidatId}.`
          });
          break;
        case CreationResult.RECRUTEUR_PAS_TROUVE:
          res.status(404).send({
            message: `Cannot create Entretien with recruteur id=${req.body.recruteurId}.`
          });
          break;
        case CreationResult.PAS_COMPATIBLE:
          res.status(400).send({
            message: "Pas la même techno"
          });
          break;
        case CreationResult.CANDIDAT_TROP_JEUNE:
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
      const entretiens = await this.entretienRepository.retrieveAll();

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
      const entretien = await this.entretienRepository.retrieveById(id);

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
      const num = await this.entretienRepository.update(entretien);

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
      const num = await this.entretienRepository.delete(id);

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
      const num = await this.entretienRepository.deleteAll();

      res.status(204).send({ message: `${num} Entretiens were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all entretiens."
      });
    }
  }
}
