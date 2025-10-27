import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  godina = new Date().getFullYear()
}
