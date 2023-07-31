export interface Post { 
    title: string,
    category: {
        categoryId: string,
        category: string
    },
    postImgPath: string,
    excerpt: string,
    isFeatured: boolean,
    views: number,
    status: string,
    createdAt: Date
}

