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

  async loadMoreUsers(event: InfiniteScrollCustomEvent) {  
    try {
      this.currentPage++;
      
      const response = await this.fetchUsers(this.currentPage).toPromise();
      
      if (response && response.length>0) {
        this.infiniteScrollDisabled = response.length ? false : true;
        this.users = [...this.users, ...response];
      }
      
      if (this.users.length >= this.totalUsers) {
        event.target.disabled = true;
      }
      
    } catch (error) {
      this.error = 'Failed to load more users. Please try again later.';
      console.error('Error loading more users:', error);
    } finally {
        event.target.complete();
    }
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
