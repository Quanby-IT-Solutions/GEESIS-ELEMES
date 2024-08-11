import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/service/api-supabase/supabase.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { Subscription } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { UserService } from 'src/app/shared/service/user/user.service';
import { GuestUser } from 'src/app/shared/models/model';

interface Material {
  title: string;
  link: string;
}

interface Assignment {
  name: string;
  dueDate: Date | null;
}

interface Exam {
  name: string;
  dueDate: Date;
}

interface Module {
  title: string;
  description: string;
  about: string;
  materials: Material[];
  assignments: Assignment[];
  exams: Exam[];
}

interface Course {
  instructor: string;
  instructor_profile: string;
  course: string;
  subject: string;
  block: string;
  time: string;
  enrolled: string;
  grade: string;
  progress: string;
  imageUrl: string;
  modules: Module[];
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  sortMenuOpen: boolean = false;
  public user: User | GuestUser | null = null;

  private userSubscription: Subscription | undefined;
  role: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private userService: UserService,
    private supabaseService: SupabaseService
  ) {}

  getUserRole() {
    return this.role;
  }

  async ngOnInit() {
    this.fetchCourses();

    const _user = await this.userService.getUser();
    console.log('Dashboard - Authenticated User Role:', _user.role);
    this.role = _user.role;

    this.userSubscription = this.supabaseService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  fetchCourses(): void {
    this.courses = this.dataService.getCourses().filter((course) => course.enrolled === 'yes');
    this.filteredCourses = this.courses;
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(
      (course) =>
        course.course.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSortMenu(): void {
    this.sortMenuOpen = !this.sortMenuOpen;
  }

  sortCourses(order: 'asc' | 'desc' = 'asc'): void {
    this.filteredCourses.sort((a, b) =>
      order === 'asc'
        ? a.course.toLowerCase().localeCompare(b.course.toLowerCase())
        : b.course.toLowerCase().localeCompare(a.course.toLowerCase())
    );
    this.sortMenuOpen = false; // Close the sort menu after sorting
  }

  selectCourse(course: Course): void {
    this.router.navigate([routes.subject_modules], { state: { course } });
  }

  navigateToModules(): void {
    this.router.navigate([routes.add_course]);
  }
}
