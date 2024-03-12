import { Component, OnInit } from '@angular/core';
import {DoctorsOptionsService} from "../../services/doctors-options.service";

@Component({
  selector: 'app-adding-page',
  templateUrl: './adding-page.component.html',
  styleUrls: ['./adding-page.component.css']
})
export class AddingPageComponent implements OnInit {

  constructor(public doctorsOptions: DoctorsOptionsService) { }

  ngOnInit(): void {
    this.doctorsOptions.add();
  }

}
