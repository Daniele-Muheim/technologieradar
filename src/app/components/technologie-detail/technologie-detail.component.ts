import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';
import { TokenService } from 'src/app/services/token.service';
import { Technologie } from '../models/Technologies';

@Component({
  selector: 'app-technologie-detail',
  templateUrl: './technologie-detail.component.html',
  styleUrls: ['./technologie-detail.component.scss']
})
export class TechnologieDetailComponent implements OnInit {
  technologie?: Technologie;

  constructor(private route: ActivatedRoute, private technologieService: TechnologyService, private router: Router, public tokenService: TokenService) { }

  ngOnInit(): void {
    this.getTechnologie();
  }

  getTechnologie(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.technologieService.getTechnologiesByID(id)
      .subscribe({
        next: (technologie) => this.technologie = technologie,
        error: (err) => {
          console.log(err)
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400 || err.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }
        }
      });
  }

  deleteTechnologie(technologie: any) {
    this.technologieService.deleteTechnologie(technologie._id).subscribe({
      next: () => this.router.navigateByUrl('rader-viewer'),
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      }
    });
  }
}
