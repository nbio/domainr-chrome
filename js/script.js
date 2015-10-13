'use strict';

(function() {

  var createChromeTab = function(url) {
    return chrome.tabs.create({
      url: url
    });
  };

  var _in = document.getElementById('query');
  var _results = document.getElementById('results');

  new domainr.SearchBox({
    observe: _in,
    clientId: '{your-api-key-goes-here}',
    renderTo: _results,
    limit: 10,
    onSelect: function(result) {
      var url = 'https://domainr.com/' + result.domain + '?q=' + _in.value;
      createChromeTab(url);
    }
  });

})();
