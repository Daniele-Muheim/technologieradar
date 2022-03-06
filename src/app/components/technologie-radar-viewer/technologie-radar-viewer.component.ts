import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';
import { TokenService } from 'src/app/services/token.service';
import { Technologie } from '../models/Technologies';

@Component({
  selector: 'app-technologie-radar-viewer',
  templateUrl: './technologie-radar-viewer.component.html',
  styleUrls: ['./technologie-radar-viewer.component.scss']
})
export class TechnologieRadarViewerComponent implements OnInit {
  technologies: Technologie[] = [];
  categories = ["Techniques", "Platforms", "Tools", "Languages & Frameworks"]
  rings = [
    { name: 'Assess', color: "primary" },
    { name: 'Trial', color: 'accent' },
    { name: 'Adopt', color: 'grey' },
    { name: 'Hold', color: 'warn' }
  ]

  constructor(private technologyService: TechnologyService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getTechnologies()
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies()
      .subscribe({
        next: (technologie) => { this.technologies = technologie},
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400 || err.status === 401 ) {
              this.router.navigateByUrl('/login');
              this.tokenService.logout();
            }
          }
        }
      });
  }
}
