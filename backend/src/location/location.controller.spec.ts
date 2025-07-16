import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

describe('LocationController', () => {
  let controller: LocationController;
  let locationService: LocationService;

  const mockLocationService = {
    markVisited: jest.fn(),
    getVisitedLabels: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    locationService = module.get<LocationService>(LocationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('saveLabel', () => {
    it('should mark the location as visited and return a response object', () => {
      const label = 'townhall';
      const result = controller.saveLabel(label);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.markVisited).toHaveBeenCalledWith(label);
      expect(result).toEqual({ visited: true, label });
    });
  });

  describe('getVisitedLabels', () => {
    it('should return list of visited labels from the service', () => {
      const labels = ['townhall', 'library'];
      mockLocationService.getVisitedLabels.mockReturnValue(labels);
      const result = controller.getVisitedLabels();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.getVisitedLabels).toHaveBeenCalled();
      expect(result).toBe(labels);
    });
  });
});
