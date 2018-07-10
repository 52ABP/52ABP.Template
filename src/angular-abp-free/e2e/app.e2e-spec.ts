import { YoyoCmsTemplateTemplatePage } from './app.po';

describe('YoyoCmsTemplate App', function() {
  let page: YoyoCmsTemplateTemplatePage;

  beforeEach(() => {
    page = new YoyoCmsTemplateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
