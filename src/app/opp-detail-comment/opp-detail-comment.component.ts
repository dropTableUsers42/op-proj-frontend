import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment, Opps } from '../_models/opps.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../_services/backend.service';
import { TimeAgoPipe } from '../_pipes/time-ago.pipe';
import { dpUrls, getUrl } from '../register/dp-overlay/dp-overlay.component';

@Component({
  selector: 'app-opp-detail-comment',
  templateUrl: './opp-detail-comment.component.html',
  styleUrls: ['./opp-detail-comment.component.scss']
})
export class OppDetailCommentComponent implements OnInit {

  @Input('comment') comment: Comment;
  @Input('opp') opp: Opps;
  @Input('depth') depth: boolean;
  @Input('dpUrlOwn') dpUrlOwn: string;
  @Output() onReplySubmitted: EventEmitter <any> = new EventEmitter<any>();

  replyForm = new FormGroup({
    data: new FormControl('')
  });

  spin = false;

  replying: boolean;

  dpUrl = '/assets/images/placeholder.jpg';

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.replying = false;

    if(this.comment?.user?.picture)
    {
      this.dpUrl = getUrl(this.comment.user.picture.style, this.comment.user.picture.colour);
    }
  }

  submitReply() {
    if (this.spin === false)
    {
      this.spin = true;

      let parent = this.comment._id;
      if(this.comment.parent != null)
      {
        parent = this.comment.parent;
      }
      this.backendService.addComment(this.opp.slug, this.replyForm.value.data, parent).subscribe(comment => {
        this.replyForm.patchValue({data: ''});
        this.onReplySubmitted.emit(comment);
        this.spin = false;
        this.replying = false;
      }
      );
    }
  }

}
