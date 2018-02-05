import { Directive, Input, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

@Directive({
  selector: '[img-preloader]',
  host: {
    '[attr.src]': 'finalImage'    //the attribute of the host element we want to update. in this case, <img 'src' />
  }
})
export class ImgPreloadDirective implements OnInit {

  @Input('img-preloader') targetSource: string;

  downloadingImage: any; // In class holder of remote image
  finalImage: any; //property bound to our host attribute.
  showloader: any;

  // Set an input so the directive can set a default image.
  @Input() defaultImage: string = 'assets/img/loader.gif';

  constructor(public events: Events) {

  }

  //ngOnInit is needed to access the @inputs() variables. these aren't available on constructor()
  ngOnInit() {
    //First set the final image to some default image while we prepare our preloader:
    this.finalImage = this.defaultImage;


    this.downloadingImage = new Image();  // create image object
    this.downloadingImage.onload = () => { //Once image is completed, console.log confirmation and switch our host attribute
      console.log('image downloaded');

      /*  this.events.subscribe('creoyou:showloader', () => {
         this.showloader = false;
       }); */

      this.finalImage = this.targetSource;  //do the switch 😀
    }
    // Assign the src to that of some_remote_image_url. Since its an Image Object the
    // on assignment from this.targetSource download would start immediately in the background
    // and trigger the onload()
    this.downloadingImage.src = this.targetSource;
  }

}
