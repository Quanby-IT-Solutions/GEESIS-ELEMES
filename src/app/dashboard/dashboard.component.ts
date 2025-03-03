import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SupabaseService } from '../shared/service/api-supabase/supabase.service';
import { UserService } from '../shared/service/user/user.service';
import { User } from '@supabase/supabase-js';
import { GuestUser } from '../shared/models/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public searchQuery = '';
  public user: User | GuestUser | null = null;
  public isMainRouteActive: boolean = false;
  public isModalVisible: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public courses: any[] = [];
  private userSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(
    private supabaseService: SupabaseService,
    private userService: UserService,
    private router: Router
  ) {}

  role: string | null = null;

  getUserRole() {
    return this.role;
  }
  
  async ngOnInit() {
    this.checkRoute();
    
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  
    const _user = await this.userService.getUser();
    
    console.log('Dashboard - Authenticated User Role:', _user.role);
    this.role = _user.role;
  
    this.userSubscription = this.supabaseService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );
  
    const guestUserJson = sessionStorage.getItem('guestUser');
    if (guestUserJson) {
      const guestUser = JSON.parse(guestUserJson);
      this.supabaseService.setGuestUser(guestUser);
    }
  
   
  }
  

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkRoute() {
    const mainRoutes = ['/', '/home', '/dashboard']; // Define your main routes here
    this.isMainRouteActive = mainRoutes.includes(this.router.url);
  }

 

  handleSearch(query: string) {
    this.searchQuery = query;
  }

  async logout() {
    if (this.isGuestUser(this.user)) {
      sessionStorage.removeItem('guestUser');
      this.supabaseService.setGuestUser(null);
    } else {
      try {
        await this.supabaseService.signOut();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
    this.user = null;
    this.router.navigate(['/home']);
  }

  isGuestUser(user: User | GuestUser | null): user is GuestUser {
    return this.userService.isGuestUser(user);
  }

  loginAsGuest(userType: string) {
    const guestUser: GuestUser = {
      id: 'guest-' + Date.now(),
      email: `guest-${userType}@example.com`,
      user_type: userType,
    };
    sessionStorage.setItem('guestUser', JSON.stringify(guestUser));
    this.supabaseService.setGuestUser(guestUser);
    this.router.navigate(['/dashboard']);
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveCourse(courseData: any) {
    this.courses.push(courseData);
    console.log('Saved courses:', this.courses);
    this.router.navigate(['/courses'], { state: { courses: this.courses } });
  }
}
