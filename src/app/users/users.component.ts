import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, IonContent } from '@ionic/angular';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

interface User {
  id: number;
  title: string;
  url: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  users: User[] = [];
  isLoading = false;
  error: string | null = null;
  itemSize = 25; 

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    await loading.present();

    this.http.get<User[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe({
        next: (response) => {
          this.users = response;
          loading.dismiss();
        },
        error: (error) => {
          this.error = 'Failed to load users. Please try again later.';
          loading.dismiss();
          console.error('Error loading users:', error);
        }
      });
  }

  async doRefresh(event: any) {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe({
        next: (response) => {
          this.users = response;
          event.target.complete();
          if (this.viewport) {
            this.viewport.scrollToIndex(0);
          }
        },
        error: (error) => {
          this.error = 'Failed to load users. Please try again later.';
          event.target.complete();
          console.error('Error loading users:', error);
        }
      });
  }

  trackByFn(index: number, item: User) {
    return item.id;
  }
}
