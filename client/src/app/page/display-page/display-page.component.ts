import { Component, OnInit } from '@angular/core';
import {DoctorsOptionsService} from "../../services/doctors-options.service";

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {

  constructor(public doctorsOptions: DoctorsOptionsService) { }

  ngOnInit(): void {
    this.doctorsOptions.display();
  }

}
