import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{
  public loading: boolean = false;

  constructor(private loaderData: LoaderService) { }

  ngOnInit(): void {
    this.loaderData.loaderState$.subscribe( loading => {
      this.loading = loading;
      console.log('LoaderComponent: isLoading', loading);
    })
  }
}
