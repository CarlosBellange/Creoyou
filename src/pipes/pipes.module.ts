import { NgModule } from '@angular/core';
import { TimeagoPipe } from './timeago/timeago';
@NgModule({
	declarations: [TimeagoPipe],
	imports: [],
	exports: [TimeagoPipe]
})
export class PipesModule {}
