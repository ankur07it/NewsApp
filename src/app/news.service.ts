import { Injectable } from '@angular/core';
import { NewsApiService } from 'angular-news-api';
import { Observable } from 'rxjs';
import { NewsListModel } from './news/model/news-list.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private _newsApiService: NewsApiService) { }

    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */

    public headlines(search?: string): Observable<NewsListModel[]> {
        return this._newsApiService.topHeadlines({
            q: search ? search : '',
            language: 'en'
        }).pipe(map((res: any) => res.articles));
    }
}
