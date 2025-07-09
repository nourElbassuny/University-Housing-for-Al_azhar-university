import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Annotation, AnnotationService} from '../../../services/annotationService/annotation.service';
import {CommonDataService} from '../../../services/commonDataService/common-data.service';


@Component({
  selector: 'app-settings',
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  isRegistrationEnabled: boolean = true;
  newMessage: string = '';
  messages: Annotation[]= [];

  constructor(private annotationService:AnnotationService,private commonService:CommonDataService) {}

  ngOnInit() {
    this.getAllAnnotations();
    this.commonService.getRegistrationStatus().subscribe(value => {
      this.isRegistrationEnabled = value.Status;
    });
  }

  addMessage() {
    if (this.newMessage.trim()) {
      const annotation:Annotation = {
        message: this.newMessage,
      }
      this.annotationService.addNewAnnotation(annotation).subscribe(
        res => {
          alert(res.message);
          this.newMessage = '';
        },
        error => {alert(error.message)}
      );


    }
  }
  getAllAnnotations() {
    this.annotationService.getAllAnnotations().subscribe(
      res=>{this.messages=res},
      error => {alert(error.message)}
    )
  }

  removeMessage(index: number) {
    this.annotationService.deleteAnnotationById(index).subscribe(
      res=>{alert(res.message)},
      error => {alert(error.message)}
    )
  }

  onToggleChange() {
    console.log(this.isRegistrationEnabled);
    this.commonService.setRegistrationStatus(this.isRegistrationEnabled).subscribe(
      () => console.log("Status updated"),
      error => alert(error.message)
    );
  }
}
