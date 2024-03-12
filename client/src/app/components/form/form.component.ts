import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { DoctorsOptionsService } from "../../services/doctors-options.service";
import { Service } from "../../../../../common/tables/Service";
import { Doctor } from "../../../../../common/tables/Doctor";
import { NewDoctor } from "../../../../../common/tables/NewDoctor";
import { CommunicationService } from "../../services/communication.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {AlertWindowComponent} from "../alert-window/alert-window.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { DatePipe } from '@angular/common';


interface Data {
  success: boolean
  message: string
  appointments?: any[]
  warning?: boolean
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() selectedDoctor: Doctor | undefined;
  @Output() activeDisable = new EventEmitter<boolean>();
  defaultDoctor: Doctor = {
    idmedecin: 0,
    nom: 'Benzema',
    prenom: 'Karim',
    specialite: 'Dermatologie',
    idservice: 0,
    anneesexperience: 1,
  }
  formTitle: string;
  services: Service[];
  doctorForm : FormGroup;

  constructor(
    public doctorsOptions: DoctorsOptionsService,
    public communicationServices: CommunicationService,
    private dialog: MatDialog) {}

  get nom(){
    return this.doctorForm.get('nom');
  }

  get prenom(){
    return this.doctorForm.get('prenom');
  }

  get anneesexperience(){
    return this.doctorForm.get('anneesexperience');
  }

  ngOnInit(): void {
    this.formTitle = this.doctorsOptions.isAdd ? "Add New Doctor" : "Modify Doctor";
    this.fetchServices();
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDoctor && this.doctorForm) this.buildForm();
  }

  submitForm() {
    if(this.doctorsOptions.isAdd) this.addDoctor();
    else if(this.doctorsOptions.isModify) this.modifyDoctor();
  }

  closeForm() {
    this.activeDisable.emit(false);
  }

  chooseDoctorType() {
    if (this.selectedDoctor === undefined) this.selectedDoctor = this.defaultDoctor;
    return this.doctorsOptions.isModify ? this.selectedDoctor : this.defaultDoctor;
  }

  private fetchServices() {
    this.communicationServices.getAllServices().subscribe((services: Service[]) => {
      this.services = services
    });
  }

  private addDoctor(){
    this.communicationServices.postDoctor(this.doctorForm.value as NewDoctor).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleError(error)
    )
  }

  private modifyDoctor() {
      if (this.selectedDoctor !== undefined) {
        const idmedecin = this.selectedDoctor.idmedecin;
        const doctor = {idmedecin, ...this.doctorForm.value} as Doctor
        this.communicationServices.putDoctor(doctor).subscribe(
          (response) => this.handleSuccess(response),
          (error) => this.handleError(error)
        )
      }
  }

  private handleSuccess(response: HttpResponse<Object>) {
    const data = response.body as Data;
    if (data && data.success && !data.appointments) {
      this.dialog.open(AlertWindowComponent, {
        data: { title: 'Operation successful!', content: data.message }
      })
    } else if (data && data.success && data.appointments) {
      const message = this.handleAppointments(data)
      this.dialog.open(AlertWindowComponent, {
        data: { title: 'Operation successful!', content: message }
      })
    }
    this.closeForm();
  }

  private handleError(error: HttpErrorResponse) {
    const data = error.error as Data
    if (data && !data.success) {
      if (data.message === 'Doctor has already been deleted by an other user.') this.closeForm();
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
        'The modified doctor had those upcoming appointments :'
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

  private buildForm(){
    const doctorToEdit = this.chooseDoctorType();
    this.doctorForm = new FormGroup({
      nom: new FormControl(doctorToEdit.nom, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u015f\u0131\u011f\u011e\u0130\u015e\u00df\u0300-\u036f]+$/)
      ]),
      prenom: new FormControl(doctorToEdit.prenom, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u015f\u0131\u011f\u011e\u0130\u015e\u00df\u0300-\u036f]+$/)
      ]),
      specialite: new FormControl(doctorToEdit.specialite),
      idservice: new FormControl(doctorToEdit.idservice),
      anneesexperience: new FormControl(doctorToEdit.anneesexperience, [
        Validators.required,
        Validators.pattern(/^(0|[1-5]?[0-9]|60)$/)
      ]),
    });
  }
}

