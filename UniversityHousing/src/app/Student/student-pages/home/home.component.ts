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
  text: string = "يهدف هذا المشروع إلى تحسين جودة حياة الطلاب والارتقاء بالخدمات المقدمة داخل المدن الجامعية، من خلال منظومة رقمية متكاملة تشمل ميكنة إجراءات التقديم والحجز، وتسهيل عمليات المتابعة الإدارية والطبية والأمنية، بما يواكب متطلبات التحول الرقمي ويعكس ريادة جامعة الأزهر في الجمع بين الأصالة والمعاصرة."
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
      this.text = "يهدف هذا المشروع إلى تحسين جودة حياة الطلاب والارتقاء بالخدمات المقدمة داخل المدن الجامعية، من خلال منظومة رقمية متكاملة تشمل ميكنة إجراءات التقديم والحجز، وتسهيل عمليات المتابعة الإدارية والطبية والأمنية، بما يواكب متطلبات التحول الرقمي ويعكس ريادة جامعة الأزهر في الجمع بين الأصالة والمعاصرة."
    } else if (this.activeItem === 'vision') {
      this.header = "الرؤية";
      this.text = "تحقيق بيئة سكنية جامعية رقمية وآمنة تُسهم في دعم المسيرة التعليمية والتربوية لطلاب جامعة الأزهر، بما يعزز من جودة الحياة الجامعية، ويواكب التحول الرقمي وفقًا لتوجيهات القيادة السياسية وفضيلة الإمام الأكبر شيخ الأزهر الشريف.";
    } else {
      this.header = "الرسالة";
      this.text = "توفير خدمات سكنية متكاملة لطلاب جامعة الأزهر من خلال تطبيقات ذكية، تتيح سهولة التقديم والحجز والمتابعة، وتعزز من قيم الانضباط والراحة والدعم النفسي والاجتماعي، وذلك برعاية فضيلة الإمام الأكبر الدكتور أحمد الطيب، وبقيادة الأستاذ الدكتور سلامة داود رئيس الجامعة.";
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
