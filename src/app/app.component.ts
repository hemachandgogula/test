import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  space = ' ';
  tableData: any[];
  automotive: any[];
  finance: any[];
  custom: any[];
  selectedvalue: any;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.automotive = [];
    this.selectedvalue = 'A';
    this.custom = [];
    this.finance = [];
    this.tableData = [];
    this.http.get("./assets/test.json").subscribe((resp: any) => {
      this.tableData = resp.outer_attribute.brands;
      this.automotive = this.tableData.filter(x => x.Vertical === "Automotive");
      this.automotive = this.automotive.sort((x, y) => x.customer_visit_ratio - y.customer_visit_ratio).reverse();
      this.automotive = this.changeToPercentage(this.automotive);
      this.finance = this.tableData.filter(x => x.Vertical === "Finance");
      this.finance = this.finance.sort((x, y) => x.customer_visit_ratio - y.customer_visit_ratio).reverse();
      this.finance = this.changeToPercentage(this.finance);
      this.custom = this.automotive;
    });
  }
  changeToPercentage(val) {
    let max = val[0].customer_visit_ratio;
    let obj = [];
    val = val.slice(0, 5);
    val.forEach((x) => {
      x.percentage = (x.customer_visit_ratio / max) * 100;
      x.percentage = parseInt(x.percentage);
      obj.push(x);
    });
    return obj;
  }
  onSelectChange(e) {
    this.selectedvalue = e.target.value;
    if (e.target.value == 'F') {
      this.custom = this.finance;
    } else {
      this.custom = this.automotive;
    }
  }

}
