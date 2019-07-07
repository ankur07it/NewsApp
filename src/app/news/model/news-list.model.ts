export interface NewsListModel {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSourceModel;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsSourceModel {
    id: string;
    name: string;
}