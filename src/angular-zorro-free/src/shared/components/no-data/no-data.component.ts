import { AppConsts } from '@shared/AppConsts';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'no-data',
  template: `
   <span class="no-result-data">
    <i *ngIf="icon" [class]="icon"></i>
    <span>{{text}}</span>
   </span>
  `,
  styles: [
    `
      .no-result-data {
        color: rgba(0, 0, 0, 0.25);
        text-align: center;
        line-height: 64px;
        font-size: 16px;
        margin: 0 auto;
      }
      .no-result-data i {
        font-size: 24px;
        margin-right: 16px;
        position: relative;
        top: 3px;
      }
    `,
  ],
  preserveWhitespaces: false,
})
export class NoDataComponent implements OnInit {
  // region fields
  /**
   * 显示文本
   */
  @Input()
  text: string;

  /**
   * 图标
   */
  @Input()
  icon = 'anticon anticon-frown-o';

  // endregion
  constructor() { }

  ngOnInit() {
    if (!this.text) {
      this.text = AppConsts.l('NoData');
    }
  }
}
