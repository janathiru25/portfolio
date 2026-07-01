import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  name = '';
  email = '';
  message = '';

  selectedProfession = '';
  otherProfession = '';
  showOther = false;

  loading = false;

  constructor(private contactService: ContactService) {}

  checkProfession() {
    this.showOther = this.selectedProfession === 'Other';
  }

  sendMessage() {

    const profession =
      this.selectedProfession === 'Other'
        ? this.otherProfession
        : this.selectedProfession;

    const data = {
      name: this.name,
      email: this.email,
      subject: profession,
      message: this.message
    };

    this.loading = true;

    this.contactService.sendMessage(data).subscribe({
      next: () => {
        this.loading = false;
        alert("Message sent successfully!");
        this.name = '';
        this.email = '';
        this.message = '';
        this.selectedProfession = '';
        this.otherProfession = '';
      },
      error: (err: any) => {
        this.loading = false;
        console.log(err);
        alert("Failed to send message");
      }
    });
  }
}