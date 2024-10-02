import { Op } from "sequelize";
import CandidatSQL from './candidat.sql';
import Candidat from "@domain/candidat/candidat.model";

interface SearchCondition {
  [key: string]: any;
}

class SqlCandidatRepository {
  async save(candidat: Candidat): Promise<Candidat> {
    try {
      return await CandidatSQL.create({
        title: candidat.langage,
        description: candidat.email,
        published: candidat.xp
      });
    } catch (err) {
      throw new Error("Failed to create Candidat!");
    }
  }

  async retrieveAll(searchParams: {email?: string}): Promise<Candidat[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.email)
        condition.email = { [Op.iLike]: `%${searchParams.email}%` };

      return await CandidatSQL.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Candidats!");
    }
  }

  async retrieveById(candidatId: number): Promise<Candidat | null> {
    try {
      let condition: SearchCondition = {};
      condition.id = { [Op.eq]: candidatId};
      const candidat = await CandidatSQL.findOne({ where: condition});
      return candidat;
    } catch (error) {
      throw new Error("Failed to retrieve Candidats!");
    }
  }

  async update(candidat: Candidat): Promise<number> {
    const { id, langage, email, xp } = candidat;

    try {
      const affectedRows = await CandidatSQL.update(
        { langage: langage, email: email, xp: xp },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Candidat!");
    }
  }

  async delete(candidatId: number): Promise<number> {
    try {
      const affectedRows = await CandidatSQL.destroy({ where: { id: candidatId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Candidat!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return CandidatSQL.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Candidats!");
    }
  }
}

export default new SqlCandidatRepository();
