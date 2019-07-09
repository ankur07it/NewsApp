import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { NewsListModel } from '../news/model/news-list.model';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

@Component({
    selector: 'app-news-detail',
    animations: [
        trigger('hoverAnimation', [
          state('mouseover', style({
            color: 'yellow'
          })),
          state('mouseout', style({
            color: 'black'
          })),
          transition('mouseover => mouseout', [
            animate('0.5s')
          ]),
          transition('mouseout => mouseover', [
            animate('0.25s')
          ]),
        ]),
      ],
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    public article: NewsListModel = null;
    public isHover:boolean = false;

    public comments: any[] = [
        {
            name: 'Chris Nat',
            date: new Date(),
            avatar: '/assets/images/1.jpg',
            comment: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
        {
            name: 'Matt Damon',
            date: new Date(),
            avatar: '/assets/images/2.jpg',
            comment: `Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. `,
        },
        {
            name: 'Seb Willhelm',
            date: new Date(),
            avatar: '/assets/images/3.jpg',
            comment: `Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.`,
        },
    ];

    constructor(
        public activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            map(() => window.history.state)
        ).subscribe(article => {
            if (!article.title) {
                this.router.navigate(['./news']);
            }
            this.article = article;
        })
    }

    public onTitleHover() {
        this.isHover = !this.isHover;
    }

    public goToArticle(url: string): void {
        window.open(url, "_blank");
    }
}
