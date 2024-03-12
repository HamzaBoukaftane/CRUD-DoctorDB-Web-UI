import { Component, OnInit } from '@angular/core';
import {DoctorsOptionsService} from "../../services/doctors-options.service";

@Component({
  selector: 'app-deleting-page',
  templateUrl: './deleting-page.component.html',
  styleUrls: ['./deleting-page.component.css']
})
export class DeletingPageComponent implements OnInit {

  constructor(public doctorsOptions: DoctorsOptionsService) { }

  ngOnInit(): void {
    this.doctorsOptions.delete();
  }

}
