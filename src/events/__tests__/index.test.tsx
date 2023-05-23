import { useEvents } from '../../events';
import { getFromStorage } from '../../utils/storage';
import { apiCall } from '../../api';

jest.mock('./utils', () => ({
  getFromStorage: jest.fn(),
  apiCall: jest.fn(),
}));

describe('useEvents', () => {
  let events: ReturnType<typeof useEvents>;

  beforeEach(() => {
    events = useEvents();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('track', () => {
    it('should call getFromStorage and apiCall with the correct arguments', async () => {
      const eventName = 'exampleEvent';
      const params = { foo: 'bar' };
      const apiKey = 'mockApiKey';

      (getFromStorage as jest.Mock).mockResolvedValue(apiKey);

      await events.track(eventName, params);

      expect(getFromStorage).toHaveBeenCalledWith('apiKey');
      expect(apiCall).toHaveBeenCalledWith('categories', 'POST', params);
    });

    it('should log the apiKey, eventName, and apiKey', async () => {
      const eventName = 'exampleEvent';
      const params = { foo: 'bar' };
      const apiKey = 'mockApiKey';

      (getFromStorage as jest.Mock).mockResolvedValue(apiKey);

      const consoleLogSpy = jest.spyOn(console, 'log');
      consoleLogSpy.mockImplementation(() => {});

      await events.track(eventName, params);

      expect(consoleLogSpy).toHaveBeenCalledWith('apiKey', eventName, apiKey);

      consoleLogSpy.mockRestore();
    });
  });
});
