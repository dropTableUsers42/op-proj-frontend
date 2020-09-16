import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment, Opps } from '../_models/opps.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../_services/backend.service';
import { TimeAgoPipe } from '../_pipes/time-ago.pipe';

@Component({
  selector: 'app-opp-detail-comment',
  templateUrl: './opp-detail-comment.component.html',
  styleUrls: ['./opp-detail-comment.component.scss']
})
export class OppDetailCommentComponent implements OnInit {

  @Input('comment') comment: Comment;
  @Input('opp') opp: Opps;
  @Input('depth') depth: boolean;
  @Output() onReplySubmitted: EventEmitter <any> = new EventEmitter<any>();

  replyForm = new FormGroup({
    data: new FormControl('')
  })

  replying: boolean;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.replying = false;
  }

  submitReply() {
    this.replying = false;

    let parent = this.comment._id;
    if(this.comment.parent != null)
    {
      parent = this.comment.parent;
    }

    this.backendService.addComment(this.opp.slug, this.replyForm.value.data, parent).subscribe(comment => {
      this.replyForm.patchValue({data: ''});
      this.onReplySubmitted.emit(comment);
    }
    )
  }

}
