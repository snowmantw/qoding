describe('Template', function() {
  describe('#fill', function() {
    var stubById;
    var node;

    beforeEach(function() {
      stubById = sinon.stub(document, 'getElementById');
      node = document.createElement('div');
      node.innerHTML = '<!--<div>Hello <%= name %></div>-->';
      node.id = 'template';
      stubById.returns(node);
    });

    afterEach(function() {
      stubById.restore();
    });

    it('should render template as string with filled variables', function() {
      var result = (new Template('template', 'id')).fill({'name': 'Bob'}).render();
      expect(result).toBe('<div>Hello Bob</div>');
    });

    it('should render template as DOM with filled variables', function() {
      var result = (new Template('template', 'id')).fill({'name': 'Bob'}).render(true);
      expect(result.nodeType).toBe(1);
      expect(result.outerHTML).toBe('<div>Hello Bob</div>');
    });
  });
});
