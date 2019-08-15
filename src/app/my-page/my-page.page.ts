import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const { Camera } = Plugins;

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.page.html',
  styleUrls: ['./my-page.page.scss'],
})
export class MyPagePage implements OnInit {

  // @ViewChild("imageElement", {read: ElementRef, static: false}) imageElement: ElementRef<ImageRef>;

  imageUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async takePicture() {
    console.log('take picture');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // Can be set to the src of an image now
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));;
    console.log(this.imageUrl);
  }

}
