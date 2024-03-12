import { Component, OnInit } from '@angular/core';
import {DoctorsOptionsService} from "../../services/doctors-options.service";

@Component({
  selector: 'app-modifying-page',
  templateUrl: './modifying-page.component.html',
  styleUrls: ['./modifying-page.component.css']
})
export class ModifyingPageComponent implements OnInit {

  constructor(public doctorsOptions: DoctorsOptionsService) { }

  ngOnInit(): void {
    this.doctorsOptions.modify();
  }

}
