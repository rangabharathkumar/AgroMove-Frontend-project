import { Component, OnInit } from '@angular/core';
import { ProduceService } from '../../core/services/produce.service';
import { Produce } from '../../shared/models/models';

@Component({
    selector: 'app-produce',
    templateUrl: './produce.component.html',
    styleUrls: ['./produce.component.css']
})
export class ProduceComponent implements OnInit {
    produceList: Produce[] = [];
    loading = true;
    showCreateForm = false;

    newProduce: Partial<Produce> = {
        name: '',
        category: 'FRUIT',
        unit: '',
        description: ''
    };

    constructor(private produceService: ProduceService) { }

    ngOnInit(): void {
        this.loadProduce();
    }

    loadProduce(): void {
        this.loading = true;
        this.produceService.getAllProduce().subscribe({
            next: (data) => {
                this.produceList = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading produce:', err);
                this.loading = false;
            }
        });
    }

    createProduce(): void {
        this.produceService.createProduce(this.newProduce).subscribe({
            next: () => {
                this.showCreateForm = false;
                this.resetForm();
                this.loadProduce();
            },
            error: (err) => console.error('Error creating produce:', err)
        });
    }

    resetForm(): void {
        this.newProduce = {
            name: '',
            category: 'FRUIT',
            unit: '',
            description: ''
        };
    }

    getCategoryIcon(category: string): string {
        const icons: { [key: string]: string } = {
            'FRUIT': '🍎',
            'VEGETABLE': '🥕',
            'GRAIN': '🌾',
            'OTHER': '📦'
        };
        return icons[category] || '📦';
    }
}
