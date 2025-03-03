import { Component } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {

  selectedTemplate: any = null;
  showGenerateCertificateSection = false;
  searchTerm: string = '';
  filteredCourses: any[] = [];
  selectedCourse: any = null; 
  isTemplateConfirmed: boolean = false;

  certificateTemplates = [
   
    {
      id: 1,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4abfee438e93487caa894bb4e996a4283d204934f5d93e810bbab23e32a03623?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 2,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c8d73d2934114ea0a0ba4561863cfa629b1b2003068794f77e791c6d91bf908d?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 3,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4d25f1a006a4d7b54cc7cea07a2735a7fa03cb9b77f5194e487ac94bccfa6b37?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 4,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/021d005b810c89b9574afef7fc7db6377afdba56912a96ed63eed4a6c469dffd?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 5,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c8418232895e9c329b93118003d64aa70d25d2ca027346be6e36586e838d0d01?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 6,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/89790bedaef6386cb2389fe05b5eb813f15370856827e6aed0d43520e1136951?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 7,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4c7604f6486be81f4f0f878b83b857a6c034e387978e8b796d049505d4a354b1?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 8,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/55deedfe4c570f2b476653b7294ea4833b18fa5b639ad4dff3bbfc3775c55965?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 9,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/578b6ebcd81b9703695a88bf43e2b5b2b04a3ffdfadcb29088693773f63226c1?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 10,
      title: 'Certificate of completion',
      description: 'Issued to students who have completed the course.',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9a5f152d9134f7fa6dbc45fd1df06b3a2bb1e257f0587b0be32a66f57e9283a8?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    }
  ];

  courses = [
    {
      id: 1,
      title: 'Financial management course',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f1b0c5d6406260cc2c66795266112094af8fec896ecbbf8450c0a03e851a2e78?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 2,
      title: 'Programming course',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f1b0c5d6406260cc2c66795266112094af8fec896ecbbf8450c0a03e851a2e78?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 3,
      title: 'Management course',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f1b0c5d6406260cc2c66795266112094af8fec896ecbbf8450c0a03e851a2e78?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 4,
      title: 'UI/UX course',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f1b0c5d6406260cc2c66795266112094af8fec896ecbbf8450c0a03e851a2e78?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    },
    {
      id: 5,
      title: 'HTML & CSS course',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f1b0c5d6406260cc2c66795266112094af8fec896ecbbf8450c0a03e851a2e78?placeholderIfAbsent=true&apiKey=377401e3604042c7b3deecb062253d04'
    }
  ];


  onGenerateCertificateClick() {
    this.showGenerateCertificateSection = true;
  }
  

  selectTemplate(template: any) {
    if (this.selectedTemplate === template) {
      this.selectedTemplate = null;
    } else {
      this.selectedTemplate = template;
    }
  }

  useSelectedTemplate() {
    if (this.selectedTemplate) {
      this.isTemplateConfirmed = true;
      console.log('Using template:', this.selectedTemplate);
    }
  }

  constructor() {
    // Initialize the filteredCourses with all available courses initially.
    this.filteredCourses = this.courses;
  }

   onSearchCourse(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase().trim();

    if (searchTerm === '') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm)
      );
    }
  }

  selectCourse(course: any) { 
    this.selectedCourse = this.selectedCourse === course ? null : course;
  }
  
  issueToCourse() {
    if (this.selectedCourse) {
      console.log('Issuing certificate to course:', this.selectedCourse);
    }
  }
  
}