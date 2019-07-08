import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { NewsListModel } from './model/news-list.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    public articles: NewsListModel[] = [];
    public search: string;
    public searchUpdate = new Subject<string>();
    public isLoadingNews: boolean = true;
    public isArticlesAvailable: boolean = false;

    constructor(
        private _newsService: NewsService
    ) {
        this.searchUpdate.pipe(
            debounceTime(500),
            distinctUntilChanged())
            .subscribe(value => {
                this.isLoadingNews = true;
                this._fetchArticles(value);
            });
    }

    public ngOnInit() {
        this._fetchArticles();
    }

    private _fetchArticles(search?: string): void {
        this._newsService.headlines(search).subscribe((articles: NewsListModel[]) => {
            this.articles = articles;
            if (this.articles.length === 0) {
                this.isArticlesAvailable = true;
            }
            this.isLoadingNews = false;
        });
    }
}
