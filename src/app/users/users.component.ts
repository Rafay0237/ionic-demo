import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, IonContent } from '@ionic/angular';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

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
  isFetchingMore = false; 
  error: string | null = null;
  currentPage = 1;
  itemsPerPage = 7;
  totalUsers = 600; 
  infiniteScrollDisabled = false; 

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    await loading.present();

    this.fetchUsers(this.currentPage).subscribe({
      next: (response) => {
        this.users = response;
        this.isLoading = false;
        this.infiniteScrollDisabled = this.users.length >= this.totalUsers;
        loading.dismiss();
      },
      error: (error) => {
        this.error = 'Failed to load users. Please try again later.';
        this.isLoading = false;
        loading.dismiss();
        console.error('Error loading users:', error);
      }
    });
  }

  fetchUsers(page: number) {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${this.itemsPerPage}`;
    return this.http.get<User[]>(url);
  }

  async loadMoreUsers(event: any) {
    if (this.isFetchingMore || this.users.length >= this.totalUsers) {
      event.target.disabled = true; 
      return;
    }
    this.isFetchingMore = true; 
    this.currentPage++;
    
    this.fetchUsers(this.currentPage).subscribe({
      next: (response) => {
        this.users = [...this.users, ...response]; 
        setTimeout(()=>{
          this.isFetchingMore = false;
          (event as InfiniteScrollCustomEvent).target.complete(); 
        },500)
        
        if (this.users.length >= this.totalUsers) {
          event.target.disabled = true;
        }
      },
      error: (error) => {
        this.error = 'Failed to load more users. Please try again later.';
        this.isFetchingMore = false;
        event.target.complete();
        console.error('Error loading more users:', error);
      }
    });
  }

  async doRefresh(event: any) {
    this.currentPage = 1;

    this.fetchUsers(this.currentPage).subscribe({
      next: (response) => {
        this.users = response; 
        event.target.complete();
        this.infiniteScrollDisabled = this.users.length >= this.totalUsers;

        if (this.viewport) {
          this.viewport.scrollToIndex(0); 
        }

        if (this.users.length < this.totalUsers) {
          event.target.disabled = false; 
        }
      },
      error: (error) => {
        this.error = 'Failed to refresh users. Please try again later.';
        event.target.complete();
        console.error('Error refreshing users:', error);
      }
    });
  }

  trackByFn(index: number, item: User) {
    return item.id;
  }
}
