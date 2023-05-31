import { Component } from '@angular/core';
import { FindPlantsService } from './find-plants.service';

@Component({
  selector: 'app-find-plants',
  templateUrl: './find-plants.component.html',
  styleUrls: ['./find-plants.component.scss']
})
export class FindPlantsComponent {

  constructor (private findPlantsService: FindPlantsService){

  }
}
