import { Directive, ElementRef, Input, Renderer2, ViewContainerRef, AfterViewInit } from "@angular/core";
import { DynamicLinkComponent } from "@app/shared/dynamic-link";

@Directive({
    selector: "[appContent]",
})

export class ContentDirective implements AfterViewInit {
    @Input()
    appStyle = true;
    constructor(
        private ref: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
    ) {}

    ngAfterViewInit() {
        const elements = Array.from(this.ref.nativeElement.getElementsByTagName("a"));
        if(elements.length){
            elements.forEach( (link: HTMLAnchorElement) => {
                if(link.hasAttribute("href") && link.getAttribute("href")[0] == '/'){
                    this.replaceLink(link,link.getAttribute("href"));
                }
            })
        }
    }
    private replaceLink(anchor: HTMLAnchorElement, href: string) {
        let processedHref = href;
        // Create a new component dynamically
        const componentRef = this.viewContainerRef.createComponent(DynamicLinkComponent);

        // Handle fragment if the link has one
        const hashtagIndex = href.indexOf('#');
        if (hashtagIndex != -1) {
            processedHref = href.substring(0, hashtagIndex);
            componentRef.instance.fragment = href.substring(hashtagIndex + 1);
        }

        componentRef.instance.routerLink = processedHref;
        componentRef.instance.linkHTML = anchor.innerHTML;
        componentRef.instance.linkClass = anchor.className;

        // Append the newly created component and destroy the old one
        this.renderer.insertBefore(anchor.parentElement, componentRef.location.nativeElement,anchor);
        this.renderer.removeChild(this.ref.nativeElement, anchor);
      }
    
}