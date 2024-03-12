import { Router, Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";

import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public async initDb() {
    this.databaseService.createAndPopulateDb();
  }

  public get router(): Router {
    const router: Router = Router();
    router.get('/doctors', async(req: Request, res: Response) => {
      try {
        const doctors = (await this.databaseService.getAllDoctors()).rows
        res.status(StatusCodes.OK).json(doctors);
      } catch (error) {
        res.status((StatusCodes.INTERNAL_SERVER_ERROR)).json(error);
      }
    });

    router.post('/doctors', async(req: Request, res: Response) => {
      const newDoctor = req.body.doctor;
      try {
        const isUnique = await this.databaseService.isUnique(newDoctor);
        if(!isUnique) {
          res.status(StatusCodes.CONFLICT).json({
            success: false,
            message: `Error! ${newDoctor.prenom} ${newDoctor.nom} already exists with the same credentials.`
          });
        } else {
          await this.databaseService.postNewDoctor(newDoctor);
          res.status(StatusCodes.CREATED).json({ success: true, message: 'Doctor has been added successfully.' });
        }
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Sorry! A server error occurred while processing the request. Please try again later.',
        });
      }
    });

    router.put('/doctors', async(req: Request, res: Response) => {
      const doctor = req.body.doctor;
      try {
        const isExisting = await this.databaseService.isExisting(doctor)
        const isUnique = await this.databaseService.isUnique(doctor);
        const nextAppointment = await  this.databaseService.getUpcomingConsultation(doctor);
        if(!isUnique) {
          res.status(StatusCodes.CONFLICT).json({
            success: false,
            message: `No modifications. Change at least one field to modify doctor.`
          });
        } else if(!isExisting) {
          res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: `Doctor has already been deleted by an other user.`,
          });
        } else if(nextAppointment.rowCount !== 0) {
          await this.databaseService.putDoctor(doctor);
          res.status(StatusCodes.OK).json({
            success: true,
            message: `Doctor has been modified successfully.`,
            appointments: nextAppointment.rows
          });
        } else {
          await this.databaseService.putDoctor(doctor);
          res.status(StatusCodes.CREATED).json({ success: true, message: 'Doctor has been modified successfully.' });
        }
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Sorry! A server error occurred while processing the request. Please try again later.',
        });
      }
    });

    router.delete('/doctors/:id', async(req: Request, res: Response) => {
      const id = Number(req.params.id)
      try {
        await this.databaseService.deleteDoctor(id);
        res.status(StatusCodes.OK).json();
      } catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Sorry! A server error occurred while processing the request. Please try again later.',
        });
      }
    });

    router.get('/services', async(req: Request, res: Response) => {
      try {
        const services = (await this.databaseService.getAllServices()).rows
        res.status(StatusCodes.OK).json(services);
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Sorry! A server error occurred while processing the request. Please try again later.',
        });
      }
    });

    router.get('/appointments/doctor/:id', async(req: Request, res: Response) => {
      const id = Number(req.params.id)
      try {
        const appointments = await this.databaseService.getAllDoctorAppointment(id)
        if (appointments.rowCount === 0) {
          res.status(StatusCodes.OK).json({
            success: true,
            message: `Doctor deletion is an irreversible action. The doctor have no appointment`,
          });
        } else {
          res.status(StatusCodes.OK).json({
            success: true,
            message: 'Doctor deletion is an irreversible action.',
            appointments: appointments.rows
          });
        }
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Sorry! A server error occurred while processing the request. Please try again later.',
        });
      }
    });
    return router;
  }
}
