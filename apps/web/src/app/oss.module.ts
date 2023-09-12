import { NgModule } from "@angular/core";

import { OrganizationCreateModule } from "./admin-console/organizations/create/organization-create.module";
import { OrganizationManageModule } from "./admin-console/organizations/manage/organization-manage.module";
import { OrganizationUserModule } from "./admin-console/organizations/users/organization-user.module";
import { LoginModule } from "./auth/login/login.module";
import { TrialInitiationModule } from "./auth/trial-initiation/trial-initiation.module";
import { LooseComponentsModule, SharedModule } from "./shared";
import { AccessComponent } from "./tools/send/access.component";
import { OrganizationBadgeModule } from "./vault/individual-vault/organization-badge/organization-badge.module";
import { VaultFilterModule } from "./vault/individual-vault/vault-filter/vault-filter.module";

@NgModule({
  imports: [
    SharedModule,
    LooseComponentsModule,
    TrialInitiationModule,
    VaultFilterModule,
    OrganizationBadgeModule,
    OrganizationManageModule,
    OrganizationUserModule,
    OrganizationCreateModule,
    LoginModule,
    AccessComponent,
  ],
  exports: [
    SharedModule,
    LooseComponentsModule,
    TrialInitiationModule,
    VaultFilterModule,
    OrganizationBadgeModule,
    LoginModule,
    AccessComponent,
  ],
  bootstrap: [],
})
export class OssModule {}
