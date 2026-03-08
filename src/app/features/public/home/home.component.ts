import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioCmsService } from '../../../core/services/portfolio-cms.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly cms = inject(PortfolioCmsService);
  private readonly i18n = inject(I18nService);

  protected readonly data = this.cms.data;
  protected readonly visibleSkills = this.cms.visibleSkills;
  protected readonly visibleExperience = this.cms.visibleExperience;
  protected readonly visibleEducation = this.cms.visibleEducation;
  protected readonly visibleCertifications = this.cms.visibleCertifications;
  protected readonly visibleProjects = this.cms.visibleProjects;
  protected readonly locale = this.i18n.locale;

  protected readonly role = computed(() =>
    this.cms.textByLocale(this.data().profile.role, this.locale())
  );

  protected readonly intro = computed(() =>
    this.cms.textByLocale(this.data().profile.intro, this.locale())
  );

  protected readonly summary = computed(() =>
    this.cms.textByLocale(this.data().profile.summary, this.locale())
  );

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected textByLocale(text: { es: string; en: string }): string {
    return this.cms.textByLocale(text, this.locale());
  }
}
