import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PortfolioCmsService } from '../../../core/services/portfolio-cms.service';
import { I18nService } from '../../../core/services/i18n.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  protected readonly cms = inject(PortfolioCmsService);
  private readonly i18n = inject(I18nService);
  private readonly auth = inject(AuthService);

  protected readonly data = this.cms.data;
  protected readonly locale = this.i18n.locale;
  protected readonly currentRole = computed(() =>
    this.cms.textByLocale(this.data().profile.role, this.locale())
  );
  protected readonly currentSummary = computed(() =>
    this.cms.textByLocale(this.data().profile.summary, this.locale())
  );

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected saveRole(value: string): void {
    this.cms.updateProfileRole(this.locale(), value);
  }

  protected saveSummary(value: string): void {
    this.cms.updateProfileSummary(this.locale(), value);
  }

  protected logout(): void {
    this.auth.logout();
  }
}
