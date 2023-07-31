import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{



   
    imgSrc: any = './assets/image-placeholder.jpg';
    selectedImage: any;
    categories: Array<any> = [];
    postFrom: any = FormGroup;
    disableInput: any;
    post: any;
    fromStatus: string ='Add new';
    docId: any;
    

   constructor(
      private categoryService: CategoriesService, 
      private fb: FormBuilder, 
      private postService: PostsService,
      private route: ActivatedRoute
      )
      {
        this.route.queryParams.subscribe(val =>{
         this.docId = val['id'];

         if(this.docId){
            this.postService.loadOneData(val['id']).subscribe(post => {
               this.post = post;
               this.postFrom = this.fb.group({
                  title: [this.post.title, [Validators.required, Validators.minLength(5)]],
                  excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(15)]],
                  category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
                  postImg: ['', Validators.required],
                  
                })
               this.imgSrc = this.post.postImgPath;
               this.fromStatus ='Edit';
            })
         } else{

            this.postFrom = this.fb.group({
               title: ['', [Validators.required, Validators.minLength(5)]],
               excerpt: ['', [Validators.required, Validators.minLength(15)]],
               category: ['', Validators.required],
               postImg: ['', Validators.required],
             })
         }
         })
      }

   ngOnInit(): void {
       this.categoryService.loadData().subscribe(val => {
           this.categories = val;
       })
   }
    
    get fc(): any{
       return this.postFrom.controls;
    }

   showPreview($event:any){
      const redaer = new FileReader();
      redaer.onload = (e) => {
        this.imgSrc = e.target?.result
      }

      redaer.readAsDataURL($event.target.files[0]);
      this.selectedImage = $event.target.files[0];
   }

   onSubmit(){

      let splited = this.postFrom.value.category.split('-');
   
      const postData: Post = {
         title: this.postFrom.value.title,
        
         category: {
            categoryId: splited[0],
            category: splited[1],
         },
         postImgPath: '',
         excerpt: this.postFrom.value.excerpt,
        
         isFeatured: false,
         views: 0,
         status: 'new',
         createdAt: new Date()
      }
     this.postService.uploadImg(this.selectedImage, postData, this.fromStatus, this.docId);
     this.postFrom.reset();
     this.imgSrc = './assets/image-placeholder.jpg';
     
   }
}
