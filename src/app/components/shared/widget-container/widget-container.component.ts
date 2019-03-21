import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  Compiler,
  OnDestroy,
  ComponentFactoryResolver
} from '@angular/core';
import { WidgetModule } from '../../../modules/widget.module';
import { WidgetService } from '../../../services/widget/widget.service';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent implements OnInit, OnDestroy {
  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;
  @Input() selector: string;
  @Input() settings: any;
  @Input() data: any; 
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();

  private componentRef: ComponentRef<any>;

  constructor(
    private widgetService: WidgetService,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const type = this.widgetService.widgets[this.selector];
    if (type) {
      const factory = this.cfr.resolveComponentFactory(type);
      this.content.clear();
      this.componentRef = this.content.createComponent(factory, 0);
      this.componentRef.instance.data = this.data;
      this.componentRef.instance.updateRefresh.subscribe(() => this.updateRefresh.emit());
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
