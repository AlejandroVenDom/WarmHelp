import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-verify',  
  standalone: false,
  styleUrl: './verify.component.scss',
  templateUrl: './verify.component.html',
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log('Token recibido:', token);
      if (token) {
        this.http.get(`http://localhost:8080/api/users/verify?token=${token}`).subscribe({
          next: (res) => {
            console.log('Verificación exitosa:', res);
            this.router.navigate(['/login']); // página de éxito
          },
        });
      }
    });
  }
    goToLogin(): void {
  this.router.navigate(['/login']);
}

}
