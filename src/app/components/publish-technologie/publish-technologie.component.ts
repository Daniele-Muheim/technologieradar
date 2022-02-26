import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';
import { TokenService } from 'src/app/services/token.service';
import { Technologie } from '../models/Technologies';

@Component({
  selector: 'app-publish-technologie',
  templateUrl: './publish-technologie.component.html',
  styleUrls: ['./publish-technologie.component.scss']
})
export class PublishTechnologieComponent implements OnInit {
  id!: string;
  publishTechnologieForm!: FormGroup;
  technologies: Technologie[] = [];
  submitted = false;
  technologieSelcted = false;
  categories = ["Techniques", "Platforms", "Tools", "Languages & Frameworks"]
  rings = [
    { name: 'Assess', color: "primary" },
    { name: 'Trial', color: 'accent' },
    { name: 'Adopt', color: 'grey' },
    { name: 'Hold', color: 'warn' }
  ]

  constructor(private formBuilder: FormBuilder, private technologyService: TechnologyService, private tokenService: TokenService, private router: Router) {
    this.publishTechnologieForm = this.formBuilder.group({
      name: [''],
      ring: ['', Validators.required],
      descriptionClassification: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTechnologieByStatus();
  }

  get publishTechnologieFormControls() {
    return this.publishTechnologieForm.controls;
  }

  getTechnologieByStatus(): void {
    this.technologyService.getTechnologiesByStatus(false)
      .subscribe({
        next: (technologie) => this.technologies = technologie,
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400 || err.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }
        }
      });
  }

  getTechnologieById(id: string): void {
    this.id = id;
    this.technologyService.getTechnologiesByID(this.id)
      .subscribe(technologieByID => this.publishTechnologieForm.patchValue(technologieByID));
    this.technologieSelcted = true;
  }

  publishTechnologie() {
    this.technologyService.publishTechnologiesByID(this.id, this.publishTechnologieForm.value)
      .subscribe();
    this.router.navigateByUrl('rader-viewer')
  }
}
