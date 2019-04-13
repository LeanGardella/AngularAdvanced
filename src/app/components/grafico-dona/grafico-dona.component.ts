import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

    @Input() params: any = [];

    // Doughnut
    public doughnutChartLabels: Label[] = [];
    public doughnutChartData: MultiDataSet = [];
    public doughnutChartType: ChartType = 'doughnut';
    public leyenda = 'Gráfica';

  constructor() {

  }

  ngOnInit() {
    this.doughnutChartLabels = this.params.labels;
    this.doughnutChartData = this.params.data;
    this.leyenda = this.params.leyenda;
    this.doughnutChartType = this.params.type;
  }

}
