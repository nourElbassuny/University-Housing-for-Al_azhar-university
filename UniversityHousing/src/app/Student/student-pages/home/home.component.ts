import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {HeaderComponent} from '../common/header/header.component';
import {FooterComponent} from '../common/footer/footer.component';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../Uthentication/services/auth.service';
import {Annotation, AnnotationService} from '../../../Admin/services/annotationService/annotation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NgClass,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    RouterOutlet,
    NgForOf,
    RouterLinkActive,
    NgStyle
  ]
})
export class HomeComponent implements OnInit {
  activeItem: string = 'goals';
  header: string = "الأهداف";
  text: string = "تنمية المهارات التكنولوجية في التقنيات الحديثة لدى الطلاب والخريجين، ولاسيما مهارات تطوير البرامج والذكاء الاصطناعي وعلوم البيانات، وتحليل الأعمال، والأمن السيبراني والفنون الرقمية، وغيرها. توفير البيئة المناسبة لبدء الأعمال الخاصة للطلاب والخريجين على منصات العمل الحر. تأهيل الطلاب والخريجين للالتحاق بوظائف مميزة في مجال تكنولوجيا المعلومات والاتصالات"
  isAuthenticated: boolean = false;
  messages: Annotation[] = [];


  constructor(private annotationServices: AnnotationService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.getAllAnnotations();
  }


  getAllAnnotations(): void {
    this.annotationServices.getAllAnnotations().subscribe(
      res=>this.messages=res,

    )
  }

  setActive(item: string) {
    this.activeItem = item;
    if (this.activeItem === 'goals') {
      this.header = "الأهداف";
      this.text = "تنمية المهارات التكنولوجية في التقنيات الحديثة لدى الطلاب والخريجين، ولاسيما مهارات تطوير البرامج والذكاء الاصطناعي وعلوم البيانات، وتحليل الأعمال، والأمن السيبراني والفنون الرقمية، وغيرها.\n" +
        "توفير البيئة المناسبة لبدء الأعمال الخاصة للطلاب والخريجين على منصات العمل الحر.\n" +
        "تأهيل الطلاب والخريجين للالتحاق بوظائف مميزة في مجال تكنولوجيا المعلومات والاتصالات"
    } else if (this.activeItem === 'vision') {
      this.header = "الرؤية";
      this.text = "تحقيق الريادة في مجال الاتصالات وتكنولوجيا المعلومات من خلال بناء قوة عاملة ماهرة ومبتكرة تقود مسيرة التحول الرقمي الشامل محليا واقليمياً.\n" +
        "\n" +
        "تنفَذ المبادرة بالتعاون مع عدد من كبرى شركات التكنولوجيا العالمية والشركات المحلية والاقليمية العاملة في مجالات تنمية مهارات الاتصالات وتكنولوجيا المعلومات، حيث تقوم الشركات بالعديد من الأنشطة، منها عقد ورش عمل تطبيقية في المجالات التكنولوجية المختلفة والمساهمة في إثراء العملية التعليمية وتوفير دورات تدريبية لتطوير مهارات الطلاب."
    } else {
      this.header = "الرسالة";
      this.text = "بناء وتأهيل الشباب المصري لرفع قدراتهم على المنافسة عالميا وذلك من خلال برنامج متكامل للتأهيل للعمل الحر واكتساب المهارات الرقمية المطلوبة في سوق العمل المعاصر"
    }
  }

  handleCardClick() {
    if (!this.isAuthenticated) {
      this.router.navigate(["/api/auth/authenticate"])
    } else {
      this.router.navigate(["/student/studentForm"])
    }
  }

}
