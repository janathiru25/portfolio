import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitorService } from '../../services/visitor.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {

  // Visitors
  visitorList: any[] = [];
  filteredVisitors: any[] = [];

  totalVisitors = 0;
  todayVisitors = 0;

  searchText = '';

  // Messages
  messageList: any[] = [];
  filteredMessages: any[] = [];

  totalMessages = 0;

  messageSearch = '';

  constructor(
    private visitorService: VisitorService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {

  alert("Admin Component Loaded");

  this.loadVisitors();
  this.loadMessages();

}
  // ===============================
  // Load Visitors
  // ===============================
  loadVisitors() {

  this.visitorService.getVisitors().subscribe({

    next: (data: any) => {

      console.log("Visitors:", data);

      this.visitorList = [...data];
      this.filteredVisitors = [...data];

      this.totalVisitors = this.visitorList.length;
      this.todayVisitors = this.visitorList.length;

      console.log("totalVisitors =", this.totalVisitors);
      console.log("visitorList =", this.visitorList);

    },

    error: (err) => {
      console.log(err);
    }

  });

}
  // ===============================
  // Load Messages
  // ===============================
  loadMessages() {

    this.contactService.getMessages().subscribe({

      next: (data: any) => {

        console.log("Messages:", data);

        this.messageList = data;
        this.filteredMessages = data;

        this.totalMessages = data.length;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // ===============================
  // Search Visitors
  // ===============================
  searchVisitor() {

    const search = this.searchText.toLowerCase();

    this.filteredVisitors = this.visitorList.filter(visitor =>

      visitor.name.toLowerCase().includes(search) ||

      visitor.email.toLowerCase().includes(search) ||

      visitor.profession.toLowerCase().includes(search)

    );

  }

  // ===============================
  // Search Messages
  // ===============================
  searchMessage() {

    const search = this.messageSearch.toLowerCase();

    this.filteredMessages = this.messageList.filter(message =>

      message.name.toLowerCase().includes(search) ||

      message.email.toLowerCase().includes(search) ||

      message.subject.toLowerCase().includes(search)

    );

  }

}