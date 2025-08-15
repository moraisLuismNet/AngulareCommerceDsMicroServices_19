import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-ecommerce',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './ecommerce.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommerceComponent {

}

