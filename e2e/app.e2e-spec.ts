import { VoidPage } from './app.po';

describe('void App', () => {
  let page: VoidPage;

  beforeEach(() => {
    page = new VoidPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
