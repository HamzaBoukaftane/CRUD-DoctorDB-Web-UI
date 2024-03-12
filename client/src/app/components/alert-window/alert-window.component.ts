import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DoctorsOptionsService} from "../../services/doctors-options.service";

@Component({
  selector: 'app-alert-window',
  templateUrl: './alert-window.component.html',
  styleUrls: ['./alert-window.component.css']
})
export class AlertWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; content: string },public doctorsOptions: DoctorsOptionsService) {}
}
