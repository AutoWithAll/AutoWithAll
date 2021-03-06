import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-sellersidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SellerSidebarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  user: any;
  isLoading = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.user = this.tokenStorageService.getUser();
    this.authService.getCurrentUser().subscribe((res) => {
      this.user = res;
    });
    this.isLoading = false;

  }
  logout() {
    console.log('logout');
    this.tokenStorageService.signOut();
    //this.router.navigateByUrl('/login');
  }
}
