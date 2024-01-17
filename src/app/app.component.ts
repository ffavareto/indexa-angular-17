import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ContactComponent } from './components/contact/contact.component';
import schedule from './agenda.json'
import { FormsModule } from '@angular/forms';

interface Contact {
  id: number
  nome: string
  telefone: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ContactComponent,
    ContainerComponent,
    FormsModule,
    HeaderComponent,
    RouterOutlet,
    SeparatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  contacts: Contact[] = schedule
  searchParam: string = ''
  
  filterContacts(): Contact[] {
    if (!this.searchParam) {
      return this.contacts
    } else {
      return this.contacts.filter(contact => {
        return this.removeAccents(contact.nome)
        .toLowerCase().includes(this.removeAccents(this.searchParam).toLowerCase());
      })
    }
  }
  
  filterContactsByInitialLetter(letter:string): Contact[] {
    return this.filterContacts().filter(contact => {
      return this.removeAccents(contact.nome)
      .toLowerCase().startsWith(this.removeAccents(letter).toLowerCase());
    });
  }
  
  removeAccents(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
