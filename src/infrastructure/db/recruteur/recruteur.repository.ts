import { Op } from "sequelize";
import RecruteurSQL from './recruteur.sql';
import Recruteur from "../../../domain/recruteur/recruteur.model";

interface SearchCondition {
  [key: string]: any;
}

class RecruteurRepository {
  async save(recruteur: Recruteur): Promise<Recruteur> {
    try {
      return await RecruteurSQL.create({
        title: recruteur.langage,
        description: recruteur.email,
        published: recruteur.xp
      });
    } catch (err) {
      throw new Error("Failed to create Recruteur!");
    }
  }

  async retrieveAll(searchParams: {email?: string}): Promise<Recruteur[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.email)
        condition.email = { [Op.iLike]: `%${searchParams.email}%` };

      return await RecruteurSQL.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Recruteurs!");
    }
  }

  async retrieveById(recruteurId: number): Promise<Recruteur | null> {
    try {
      return await RecruteurSQL.findByPk(recruteurId);
    } catch (error) {
      throw new Error("Failed to retrieve Recruteurs!");
    }
  }

  async update(recruteur: Recruteur): Promise<number> {
    const { id, langage, email, xp } = recruteur;

    try {
      const affectedRows = await RecruteurSQL.update(
        { langage: langage, email: email, xp: xp },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Recruteur!");
    }
  }

  async delete(recruteurId: number): Promise<number> {
    try {
      const affectedRows = await RecruteurSQL.destroy({ where: { id: recruteurId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Recruteur!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return RecruteurSQL.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Recruteurs!");
    }
  }
}

export default new RecruteurRepository();
