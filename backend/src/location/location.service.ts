import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  private visitedLabels = new Set<string>();

  markVisited(label: string): void {
    this.visitedLabels.add(label);
  }

  getVisitedLabels(): string[] {
    return Array.from(this.visitedLabels);
  }
}
