import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
    templateUrl: './orderManagement.component.html',
    styleUrls: ['./orderManagement.component.css'],
    selector: 'admin-order-mgmt',
})
export class OrderManagementComponent implements OnInit {
    @ViewChild('closebuttondelete') closeDeleteButton: any;
    constructor(
        private customerService: CustomerService,
        private toastrService: ToastrService,
        private orderService: OrderService,
        private route: Router
    ) {
        this.searchCustomerControl = new FormControl('', {});
    }
    searchCustomerControl!: FormControl;
    customers: any;
    loading = false;
    orders: any;
    pageSize = 8;
    pageNo = 1;
    total = 0;
    numberOfResults = 0;
    sortBy = '';
    reverse = false;
    selectedDelete: any;
    ngOnInit(): void {
        this.loading = true;
        this.getCustomerOptions();
        this.getPage(1);
    }
    refresh() {
        this.searchCustomerControl.reset();
        this.ngOnInit();
    }
    getPage(page: number) {
        this.orderService
            .getAll({
                pageSize: this.pageSize,
                pageNo: page,
                sortBy: this.sortBy,
                reverse: this.reverse,
                customerId: this.searchCustomerControl.value,
            })
            .subscribe((response) => {
                console.log(response);

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
    getCustomerOptions() {
        this.customerService.getAll().subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.customers = response.content;
        });
    }
    edit(order: any) {
        this.route.navigateByUrl('/admin/order-mgmt/' + order.id);
    }
    add() {
        this.orderService.createOrder().subscribe((response) => {
            console.log(response);
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.route.navigateByUrl('/admin/order-mgmt/' + response.id);
        });
    }
    setSelectedDelete(order: any) {
        this.selectedDelete = order;
    }
    deleteOrder() {
        this.orderService
            .deleteOrder(this.selectedDelete.id)
            .subscribe((response) => {
                console.log(response);

                this.closeDeleteButton.nativeElement.click();
                if (Object.keys(response).includes('message')) {
                    this.toastrService.error(response.message);
                    return;
                }
                this.toastrService.success('Delete order successfully');
                this.refresh();
            });
    }
}
