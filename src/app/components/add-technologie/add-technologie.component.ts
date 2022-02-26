import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';
import { TokenService } from 'src/app/services/token.service';
import { Technologie } from '../models/Technologies';

@Component({
  selector: 'app-add-technologie',
  templateUrl: './add-technologie.component.html',
  styleUrls: ['./add-technologie.component.scss']
})
export class AddTechnologieComponent implements OnInit {
  addTechnologieForm!: FormGroup;
  submitted = false;
  technologies: Technologie[] = [];
  categories = ["Techniques", "Platforms", "Tools", "Languages & Frameworks"]
  rings = [
    { name: 'Assess', color: "primary" },
    { name: 'Trial', color: 'accent' },
    { name: 'Adopt', color: 'grey' },
    { name: 'Hold', color: 'warn' }
  ]

  constructor(private formBuilder: FormBuilder, private technologyService: TechnologyService, private tokenService: TokenService, private router: Router) {
    this.addTechnologieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      ring: [''],
      description: ['', Validators.required],
      descriptionClassification: ['']
    });
  }

  ngOnInit(): void { }

  get addTechnologieFormControls() {
    return this.addTechnologieForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addTechnologieForm.invalid) {
      return;
    }
    this.createTechnologie();
  }

  createTechnologie() {

    if (this.addTechnologieForm.invalid) {
      return;
    }

    this.technologyService.createTechnologie(this.addTechnologieForm.value)
      .subscribe(technologie => {
        this.technologies.push(technologie);
      });

    window.location.reload();
  }
}
