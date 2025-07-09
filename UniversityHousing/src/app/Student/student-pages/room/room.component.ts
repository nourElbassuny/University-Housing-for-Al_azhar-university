import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Room} from '../../../Classes/room/room';
import {RoomService} from '../../../Admin/services/roomService/room.service';
import {StudentsService} from '../../../Admin/services/studentService/students.service';
import {Student} from '../../../Classes/student/student';

@Component({
  selector: 'app-room',
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './room.component.html',
  standalone: true,
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  rooms!: Room[];
  student!: Student;
  studentAssigmentStatus: boolean = false;
  @ViewChild('successModal') successModal!: ElementRef;

  constructor(private roomService: RoomService, private studentService: StudentsService, private router: Router) {
  }

  ngOnInit() {
    this.getStudent();
    this.getAllNonEmptyRoom();
    this.getStudentAssigmentStatus();
  }

  getAllNonEmptyRoom() {
    this.roomService.getNonFullRooms().subscribe(
      res => this.rooms = res,
      error => alert(error.message),
    )
  }

  getStudentAssigmentStatus() {
    this.roomService.findStudentAssignment().subscribe(
      res => {
        this.studentAssigmentStatus = res.status;
      }, error => alert(error.message),
    )
  }

  getStudent() {
    this.studentService.getStudent().subscribe(
      res => this.student = res,
      error => alert(error.message),
    )
  }

  passingRoom(item: any) {

  }

  bookRoom(item: number) {
    console.log(item);
    this.roomService.makeBooking(item).subscribe(
      res => {
        console.log(res)
        console.log("تم الحجز:", res);
        this.showSuccessModal();
        this.router.navigate(['/home']);
      },
      error => alert(error.message),
    )
  }

  private showSuccessModal() {
    const modal = new (window as any).bootstrap.Modal(this.successModal.nativeElement);
    modal.show();
  }
}
