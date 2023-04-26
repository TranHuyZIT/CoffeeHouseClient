import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
    templateUrl: 'ordered.component.html',
    styleUrls: ['ordered.component.css'],
    selector: 'ordered-component',
})
export class OrderedComponent implements OnChanges {
    @Input() customer: any;
    pageSize = 4;
    sortBy: any;
    reverse: any;
    orders: any;
    total: any;
    numberOfResults: any;
    pageNo: any;
    constructor(
        private orderService: OrderService,
        private toastrService: ToastrService
    ) {}
    loading = true;
    ngOnChanges(simpleChanges: SimpleChanges) {
        this.loading = true;
        this.getPage(1);
    }
    refresh() {
        this.loading = true;
        this.getPage(1);
    }
    getPage(page: number) {
        this.loading = true;
        this.orderService
            .getAll({
                pageSize: this.pageSize,
                pageNo: page,
                sortBy: this.sortBy,
                reverse: !this.reverse,
                customerId: this.customer.id,
            })
            .subscribe((response) => {
                this.loading = false;
                if (Object.keys(response).includes('message')) {
                    this.toastrService.error(response.message);
                    return;
                }
                this.orders = response.content;
                this.loading = false;
                this.total = response.totalElements;
                this.numberOfResults = response.numberOfElements;
                this.pageNo = response.pageable.pageNumber + 1;
            });
    }
}
