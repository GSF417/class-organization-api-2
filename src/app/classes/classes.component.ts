import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UCs } from '../UCs';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  fileName = '';
  errorMessage = '';
  form_class: any = {
    email: null,
    password: null,
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.http.post('/api/thumbnail-upload', formData);

      upload$.subscribe();
    }
  }
  onSubmit(): void {
    const { email, password } = this.form_class;
    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
