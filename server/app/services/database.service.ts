import {injectable} from "inversify";
import * as pg from "pg";
import * as fs from 'fs';
import * as path from 'path';
import "reflect-metadata";

interface Doctor {
  idmedecin: number
  nom: string
  prenom: string
  specialite: string
  idservice: number
  anneesexperience: number
}

interface NewDoctor {
  nom: string
  prenom: string
  specialite: string
  idservice: number
  anneesexperience: number
}

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "hopital_bd",
    password: "admin",
    port: 5433,
    host: "127.0.0.1",
    keepAlive: true
  };
  public pool: pg.Pool = new pg.Pool(this.connectionConfig);
  private schemaFile = path.resolve(__dirname, '../../../database/bdschema.sql');
  private populateFile = path.resolve(__dirname, '../../../database/data.sql');

  public async createAndPopulateDb(): Promise<void> {
    const client = await this.pool.connect();
    const createTableSqlScript = fs.readFileSync(this.schemaFile, 'utf8');
    const populateTableSqlScript = fs.readFileSync(this.populateFile, 'utf8');
    await client.query(createTableSqlScript);
    await client.query(populateTableSqlScript);
    client.release();
  }

  public async getAllDoctors(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM medecins ORDER BY idmedecin;`);
    client.release();
    return res;
  }

  public async getAllServices(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM services;`);
    client.release();
    return res;
  }

  public async postNewDoctor(doctor: NewDoctor): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const new_idmedecin = await this.getNextPK(client);
    const res = await client.query(`
        INSERT INTO medecins VALUES($1, $2, $3, $4, $5, $6);`,
        [new_idmedecin, doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice]
    );
    client.release()
    return res;
  }

  public async putDoctor(doctor: Doctor): Promise<pg.QueryResult> {
      const client = await this.pool.connect();
      const res = await client.query(`
         UPDATE medecins
         SET
            prenom = $2,
            nom = $3,
            specialite = $4,
            anneesexperience = $5,
            idservice = $6
         WHERE
            idmedecin = $1;
      `, [doctor.idmedecin, doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice]);
      client.release();
      return res
  }

  public async getUpcomingConsultation(doctor: Doctor){
    const client = await this.pool.connect();
    const res = await client.query(`
        SELECT daterendezvous 
        FROM rendezvous 
        WHERE 
            idmedecin = $1 AND
            daterendezvous >= CURRENT_DATE  
        ORDER BY daterendezvous;`, [doctor.idmedecin]);
    client.release();
    return res;
  }

  public async getAllDoctorAppointment(id: number) {
    const client = await this.pool.connect();
    const res = await client.query(`
        SELECT daterendezvous 
        FROM rendezvous 
        WHERE 
            idmedecin = $1
        ORDER BY daterendezvous;`, [id]);
    client.release();
    return res;
  }

  public async isUnique(doctor: NewDoctor | Doctor): Promise<boolean> {
    const client = await this.pool.connect();
    const res = await client.query(`
        SELECT * FROM medecins 
        WHERE prenom = $1 AND nom = $2 AND specialite = $3 AND anneesexperience = $4 AND idservice = $5;`,
        [doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice]);
    client.release();
    return res.rowCount === 0;
  }

  public async isExisting(doctor: Doctor): Promise<boolean> {
    const client = await this.pool.connect();
    const res = await client.query(`
        SELECT * FROM medecins 
        WHERE idmedecin = $1;`,
        [doctor.idmedecin]);
    client.release();
    return res.rowCount > 0;
  }

  public async deleteDoctor(id:number) {
    await this.deleteAppointments(id);
    const client = await this.pool.connect();
    const res = await client.query(`
        DELETE FROM medecins 
        WHERE idmedecin = $1;
        `, [id]);
    client.release();
    return res;
  }

  private async deleteAppointments(id: number)  {
    const client = await this.pool.connect();
    const res = await client.query(`
        DELETE FROM rendezvous 
        WHERE idmedecin = $1;
        `, [id]);
    client.release();
    return res;
  }

  private async getNextPK(client: pg.PoolClient): Promise<number> {
    const res = await client.query(`SELECT MAX(idmedecin) FROM medecins;`);
    const max = res.rows[0].max;
    return max === null ? 1: max + 1;
  }
}
