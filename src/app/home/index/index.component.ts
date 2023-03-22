import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/core/services/productCategory.service';

@Component({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    selector: 'home-index',
})
export class IndexComponent implements OnInit {
    constructor(private categoryService: ProductCategoryService) {}

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
            console.log(this.categories);
        });
    }
    categories: any;
    slideConfig = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
    };
}
