import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCategoryService } from 'src/app/core/services/productCategory.service';

@Component({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    selector: 'home-index',
    animations: [
        trigger('ngIf', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s', style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class IndexComponent implements OnInit {
    constructor(
        private categoryService: ProductCategoryService,
        private productService: ProductService,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.categoryService.getAll().subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                return;
            }
            this.categories = response.map((ele: any) => ({
                ...ele,
                image:
                    'http://localhost:8080/api/v1/prod-category/image/' +
                    ele.id,
            }));
            this.slides = [
                {
                    image: 'https://brademar.com/wp-content/uploads/2022/10/The-Coffee-House-Logo-PNG-2.png',
                    name: 'All',
                },
                ...this.categories,
            ];
        });
        this.getPage(1);
    }
    getPage(page: number) {
        this.loading = true;
        this.productService
            .getAll({
                pageSize: this.pageSize,
                pageNo: page,
                sortBy: this.sortBy,
                prodCategoryID: this.productCategoryFilterId,
            })
            .pipe(
                tap((res) => {
                    this.total = res.totalElements;
                    this.numberOfResults = res.numberOfElements;
                    this.pageNo = res.pageable.pageNumber + 1;
                    this.loading = false;
                })
            )
            .subscribe((response) => {
                console.log(response);
                this.products = response.content;
                this.total = response.totalElements;
                this.numberOfResults = response.content.length;
            });
    }
    // data
    categories: any;
    products: any;
    // Slider
    slides: any;
    slideConfig = {
        slidesToShow: 5,
        slidesToScroll: 2,
        dots: true,
        centerMode: true,
        focusOnSelect: true,
    };
    loading = true;
    // Pagination
    pageSize = 6;
    pageNo = 1;
    total = 0;
    sortBy = '';
    numberOfResults = 0;
    productCategoryFilterId: any;
    selectCategoryFilter(cate: any) {
        this.productCategoryFilterId = cate.id;
        this.getPage(1);
    }
    // Detail
    navigateToDetail(id: number) {
        this.route.navigateByUrl('/home/product/' + id);
    }
}
