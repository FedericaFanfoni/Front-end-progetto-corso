import { Component } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  constructor(public utility: UtilityService){}
}
