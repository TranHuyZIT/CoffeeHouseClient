import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({ selector: '[appShowAdmin]' })
export class ShowAdminDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private viewContainer: ViewContainerRef
    ) {}

    condition = true;

    ngOnInit() {
        this.authService.isAdmin.subscribe((isAdmin) => {
            console.log(isAdmin);

            if ((isAdmin && this.condition) || (!isAdmin && !this.condition)) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }

    @Input() set appShowAdmin(condition: boolean) {
        this.condition = condition;
    }
}
