import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {BlogCommentDto, BlogDto} from '../../models/blog.dto';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  @ViewChild('CommentForm') commentForm: NgForm;
  blogDetail: BlogDto = new BlogDto();
  comment: BlogCommentDto;

  constructor(private _http: HttpClient,
              private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getBlogDetail(id);
    } else {
      window.history.back();
    }
  }

  getBlogDetail(id) {
    this._http.get(environment.baseUrl + '/api/blog/' + id).subscribe((response: BlogDto) => {
      this.blogDetail = response;
    }, () =>  window.history.back());
  }

  setHit() {
    this._http.get(environment.baseUrl + '/api/blog/set-hit');
  }

  shareComment() {
    if (this.commentForm.valid) {
      this._http.post(environment.baseUrl + '/api/blog/add-comment', this.comment);
    } else {

    }
  }
}
