import { FooterComponent } from './../../footer/footer.component';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-contacts',
    standalone: true,
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css',
    imports: [FooterComponent, HeaderComponent]
})
export class ContactsComponent {

}
