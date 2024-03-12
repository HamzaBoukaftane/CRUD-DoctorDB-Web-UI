import {Component, OnDestroy, OnInit} from '@angular/core';
import { Doctor } from "../../../../../common/tables/Doctor";
import {CommunicationService} from "../../services/communication.service";
import {DoctorsOptionsService} from "../../services/doctors-options.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AlertWindowComponent} from "../alert-window/alert-window.component";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import { Subscription } from 'rxjs';


interface Data {
  success: boolean
  message: string
  appointments?: any[]
  warning?: boolean
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctors: Doctor[];
  selectedDoctor: Doctor;
  isActionEnable: boolean = false;
  private confirmingDeleteSubscription: Subscription;


  constructor(
    public communicationServices: CommunicationService,
    public doctorsOptions: DoctorsOptionsService,
    private dialog: MatDialog) {
    this.confirmingDeleteSubscription = this.doctorsOptions.confirmingDelete$.subscribe((value) => {
      if(!value) {
        this.doctorsOptions.isConfirmingDelete = true;
        this.forceDeleteDoctor();
      }
    });
  }

  refresh() {
    this.fetchDoctors();
  }

  ngOnInit(): void {
   this.fetchDoctors();
  }

  ngOnDestroy() {
    this.confirmingDeleteSubscription.unsubscribe();
  }

  getIcon(): string {
    return this.doctorsOptions.isDelete ? "delete" : "edit";
  }

  handleAction(id: number) {
    this.doctorsOptions.isDelete ? this.deleteDoctor(id) : this.modifyDoctor(id);
    if (this.doctorsOptions.isModify) this.isActionEnable = true;
  }

  addDoctor() {
    this.isActionEnable = true;
  }

  private async deleteDoctor(id: number) {
    this.doctorsOptions.isConfirmingDelete = false;
    const doctorIndex = this.findDoctorIndex(id)
    this.selectedDoctor = this.doctors[doctorIndex];
    const idmedecin = this.selectedDoctor.idmedecin;
    this.communicationServices.getDoctorAppointments(idmedecin).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleError(error)
    )
  }

  private forceDeleteDoctor() {
    if (this.selectedDoctor !== undefined) {
      const idmedecin = this.selectedDoctor.idmedecin;
      this.communicationServices.deleteDoctor(idmedecin).subscribe(
        () => {
          this.fetchDoctors();
          this.dialog.open(AlertWindowComponent, {
          data: { title: 'Operation successful!', content: 'Doctor as been completely erased.' }
        })},
        (error) => this.handleError(error)
      )
    }
  }

  private modifyDoctor(id: number) {
      const doctorIndex = this.findDoctorIndex(id)
      this.selectedDoctor = this.doctors[doctorIndex];
  }

  private findDoctorIndex(id: number) {
    return this.doctors.findIndex((doctor: Doctor) => doctor.idmedecin === id);
  }

  private fetchDoctors() {
    this.communicationServices.getAllDoctors().subscribe((doctors: Doctor[]) => {
      this.doctors = [...doctors];
      this.isActionEnable = false;
    });
  }

  private handleSuccess(response: HttpResponse<Object>) {
    const data = response.body as Data;
    if (data && data.success && !data.appointments && !this.doctorsOptions.isConfirmingDelete) {
      this.dialog.open(AlertWindowComponent, {
        data: { title: 'Are you sure you want to continue?', content: data.message }
      })
    } else if (data && data.success && data.appointments && !this.doctorsOptions.isConfirmingDelete) {
      const message = this.handleAppointments(data)
      this.dialog.open(AlertWindowComponent, {
        data: { title: 'Are you sure you want to continue?', content: message }
      })
    }
  }

  private handleError(error: HttpErrorResponse) {
    const data = error.error as Data
    if (data && !data.success) {
      this.dialog.open(AlertWindowComponent, {
        data: { title: 'Operation failed!', content: data.message }
      })
    }
  }

  private handleAppointments(data: Data){
    if (data && data.message && data.appointments) {
      const datePipe = new DatePipe('en-US');
      const intro = this.doctorsOptions.isDelete ?
        "By deleting this doctor, you are also deleting all the doctor's appointments:" :
        'For upcoming appointments of the previous doctor scheduled for :'
      const outro = this.doctorsOptions.isDelete ? 'will be' : 'have been'
      let changedAppointments = `<br>${intro}<br><br>`;
      for (let appointment of data.appointments) {
        const formattedDate = datePipe.transform(appointment.daterendezvous, 'yyyy-MM-dd');
        changedAppointments += `${formattedDate}<br>`;
      }
      changedAppointments += `<br>All the patient ${outro} notify of the change.`
      return data.message + changedAppointments
    } else return undefined;
  }
}
