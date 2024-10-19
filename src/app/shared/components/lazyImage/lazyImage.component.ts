import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'shared-lazy-image',
    standalone: false,
    templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent { 
    @Input()
    public url!: string;

    @Input()
    public alt!: string;

    @Input()
    public hasLoaded: boolean = false;

    ngOnInit(): void {
        if (!this.url) throw new Error('URL property is required');
    }

    onLoad(): void {
       console.log('Image loaded');
       this.hasLoaded = true; 
    }

}
