/** global _ */

(function(exports) {
  var Template = function(reference, type) {
    this.reference = reference;
    this.type = type;
    this.html = this.find(reference, type);
  };
  Template.prototype = {
    configs: {
      reference: '',
      type: ''
    }
  };

  Template.prototype.find = function(reference, type) {
    var elem = null;
    switch(type) {
      case 'id':
        elem = document.getElementById(reference);
        break;
      case 'template-id':
        elem = document.querySelector('[data-template-id="' + reference + '"]');
        break;
    }
    if (!elem) {
      throw new Error('selected no node with reference: ' +
        reference + '#' + type);
    }
    var found = null;
    for (var idx in elem.childNodes) {
      if (8 === elem.childNodes[idx].nodeType) {
        found = elem.childNodes[idx];
        break;
      }
    }
    if (!found) {
      throw new Error('selected no comments node with reference: ' +
        reference + '#' + type);
    }
    return found.nodeValue;
  };

  Template.prototype.fill = function(variables) {
    var result = _.template(this.html)(variables);
    this.result = result;
    return this;
  };

  Template.prototype.render = function(truelyRender) {
    if (!truelyRender) {
      return this.result;
    }
    var dummy = document.createElement('div');
    dummy.innerHTML = this.result;
    return dummy.firstElementChild;
  };

  exports.Template = Template;
})(window);
