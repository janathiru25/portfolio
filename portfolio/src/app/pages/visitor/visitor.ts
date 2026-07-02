import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-visitor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visitor.html',
  styleUrl: './visitor.css'
})
export class VisitorComponent {

  loading = false;

  showOther = false;

  visitorForm;

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router
  ) {

    this.visitorForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z ]+$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      profession: [
        '',
        Validators.required
      ],

      otherProfession: ['']

    });

  }

  checkProfession() {

    const profession = this.visitorForm.value.profession;

    if (profession === 'Other') {

      this.showOther = true;

      this.visitorForm.get('otherProfession')
        ?.setValidators([Validators.required]);

    } else {

      this.showOther = false;

      this.visitorForm.get('otherProfession')
        ?.clearValidators();

      this.visitorForm.patchValue({
        otherProfession: ''
      });

    }

    this.visitorForm.get('otherProfession')
      ?.updateValueAndValidity();

  }

  continue() {

    if (this.visitorForm.invalid) {

      this.visitorForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const formData = { ...this.visitorForm.value };

    if (formData.profession === 'Other') {

      formData.profession = formData.otherProfession;

    }

    delete formData.otherProfession;

    this.visitorService.addVisitor(formData).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate(['/home']);

      },

      error: (err) => {

  this.loading = false;

  console.log("FULL ERROR:", err);

  alert(JSON.stringify(err.error));

}

    });

  }

  skip() {

    this.router.navigate(['/home']);

  }

}