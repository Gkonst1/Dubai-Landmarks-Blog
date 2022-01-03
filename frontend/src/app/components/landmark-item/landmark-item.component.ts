import { Component, OnInit, Input, Output } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Landmark } from '../../interface/Landmark';

@Component({
  selector: 'app-landmark-item',
  templateUrl: './landmark-item.component.html',
  styleUrls: ['./landmark-item.component.css']
})
export class LandmarkItemComponent implements OnInit {
  @Input() landmark?: Landmark;
  landmarkImage: string = '';
  placeholder: string   = '';


  constructor() {}

  ngOnInit(): void {
    this.landmarkImage = this.landmark?.photo?.url || '';
    this.placeholder   = '../../../assets/placeholder.gif';
  }
}
