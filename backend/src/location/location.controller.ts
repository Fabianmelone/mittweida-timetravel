import { Body, Controller, Post, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly LocationService: LocationService) {}

  @Post('visit')
  saveLabel(@Body('label') label: string) {
    this.LocationService.markVisited(label);
    return { visited: true, label };
  }

  @Get('visited')
  getVisitedLabels() {
    return this.LocationService.getVisitedLabels();
  }
}
