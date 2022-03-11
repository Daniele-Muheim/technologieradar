import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';
import { TokenService } from 'src/app/services/token.service';
import { Change, Technologie } from '../models/Technologies';

@Component({
  selector: 'app-edit-technologie',
  templateUrl: './edit-technologie.component.html',
  styleUrls: ['./edit-technologie.component.scss']
})
export class EditTechnologieComponent implements OnInit {
  id!: string;
  editTechnologieForm!: FormGroup;
  submitted = false;
  changeHistory: Change[] = [];
  technologie!: Technologie;
  categories = ["Techniques", "Platforms", "Tools", "Languages & Frameworks"]
  rings = [
    { name: 'Assess', color: "primary" },
    { name: 'Trial', color: 'accent' },
    { name: 'Adopt', color: 'grey' },
    { name: 'Hold', color: 'warn' }
  ]

  constructor(private formBuilder: FormBuilder, private technologyService: TechnologyService, private tokenService: TokenService, private router: Router, private route: ActivatedRoute,) {
    this.editTechnologieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      ring: [''],
      description: ['', Validators.required],
      descriptionClassification: ['']
    });
  }

  ngOnInit(): void {
    this.getTechnologieByID();
  }

  get editTechnologieFormControls() {
    return this.editTechnologieForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editTechnologieForm.invalid) {
      return;
    }
  }

  getTechnologieByID() {
    this.id = this.route.snapshot.params['id'];
    this.technologyService.getTechnologiesByID(this.id?.toString())
      .subscribe(technologieByID => {
        this.technologie = technologieByID
        this.changeHistory = technologieByID.history
        this.editTechnologieForm.patchValue(technologieByID)
      });
  }

  editTechnologie() {
    if (this.editTechnologieForm.invalid) {
      return;
    }
    if (!(typeof this.technologie?.history == 'undefined')) {
      this.changeHistory = this.technologie?.history!;
      this.changeHistory.push({
        author: this.tokenService.getUsername(),
        changeDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      })
    } else {
      this.changeHistory = [{
        author: this.tokenService.getUsername(),
        changeDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      }]
    }

    const editTechnologie: Technologie = {
      name: this.editTechnologieForm.value.name,
      category: this.editTechnologieForm.value.category,
      description: this.editTechnologieForm.value.description,
      ring: this.editTechnologieForm.value.ring,
      descriptionClassification: this.editTechnologieForm.value.descriptionClassification,
      status: this.technologie.status,
      creationDate: this.technologie.creationDate,
      publicationDate: this.technologie.publicationDate,
      history: this.changeHistory,
    }

    this.technologyService.editTechnologiesByID(this.id, editTechnologie)
      .subscribe(
        () => this.router.navigateByUrl('rader-viewer')
      );
  }

}
