import { Directive, ElementRef, Input, Renderer2, ViewContainerRef } from "@angular/core";
import { DynamicLinkComponent } from "@app/shared/dynamic-link";

@Directive({
    selector: "[content]",
})

export class ContentDirective {
    @Input()
    appStyle: boolean = true;
    constructor(
        private ref: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
    ) {}

    ngAfterViewInit() {
        let elements = Array.from(this.ref.nativeElement.getElementsByTagName("a"));
        if(elements.length){
            elements.forEach( (link: HTMLAnchorElement) => {
                if(link.hasAttribute("href") && link.getAttribute("href")[0] == '/'){
                    this.replaceLink(link,link.getAttribute("href"));
                }
            })
        }
    }
    private replaceLink(anchor: HTMLAnchorElement, href: string) {
        // Create a new component dynamically
        const componentRef = this.viewContainerRef.createComponent(DynamicLinkComponent);
        componentRef.instance.routerLink = href;
        componentRef.instance.linkHTML = anchor.innerHTML;
        componentRef.instance.linkClass = anchor.className;

        // Append the newly created component and destroy the old one
        this.renderer.insertBefore(anchor.parentElement, componentRef.location.nativeElement,anchor);
        this.renderer.removeChild(this.ref.nativeElement, anchor);
      }
    
}