import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PromotionService } from 'src/app/core/services/promotion.service';
import { PromotionDetailComponent } from './detail/promotionDetail.component';
import SendCodeDialog from './sendCodeDialog/SendCodeDialog.component';

@Component({
    selector: 'admin-promotion',
    templateUrl: 'promotionManagement.component.html',
    styleUrls: ['promotionManagement.component.css'],
})
export class PromotionManagementComponent implements OnInit {
    SendCodeDialogRef: any;
    constructor(
        private promotionService: PromotionService,
        private toastrService: ToastrService,
        private dialogService: MatDialog,
        public dialog: MatDialog
    ) {}

    // Rendering page
    loading = true;
    ngOnInit(): void {
        this.getPage(1);
    }
    refresh() {
        this.ngOnInit();
    }
    openDialog(voucherId: any) {
        this.SendCodeDialogRef = this.dialog.open(SendCodeDialog, {
            data: { voucherId },
        });
    }
    add() {
        const dialogRef = this.dialogService.open(PromotionDetailComponent, {
            data: {
                id: 0,
                type: 'add',
            },
        });
        dialogRef.afterClosed().subscribe(() => this.refresh());
    }
    selectCard(id: any, type: string) {
        const dialogRef = this.dialogService.open(PromotionDetailComponent, {
            data: {
                id: id,
                type: type,
            },
        });
        if (type === 'update')
            dialogRef.afterClosed().subscribe(() => this.refresh());
    }

    // Paging
    pageSize = 8;
    pageNo = 1;
    total = 0;
    numberOfResults = 0;
    sortBy = '';
    reverse = false;
    getPage(page: number) {
        this.promotionService
            .getAll({
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                reverse: this.reverse,
                sortBy: this.sortBy,
            })
            .subscribe({
                next: (response) => {
                    this.promotions = response.content;
                    this.loading = false;
                    this.total = response.totalElements;
                    this.numberOfResults = response.numberOfElements;
                    this.pageNo = response.pageable.pageNumber + 1;
                },
                error: (err) => {
                    this.toastrService.error(err.message);
                },
            });
    }

    // Data and form
    promotions: any;
}
