
(function($){
  
  $(document).ready(function(){
    loadBaseChapters('.olc-ls-textbook');
  });
  
  function loadBaseChapters (selector) {
    // Load chapters as links
    $.getJSON('api/chapter', function(response, status, request){
      
      console.log(response);

      // Rearrange chapters by index
      var tree = [];
      tree[0] = {};
      var chapters = response.data;
      for (idx in chapters) {
        var chapter = chapters[idx];
        if (tree[chapter.tid]) {
          tree[chapter.tid] = tree[chapter.tid].concat(chapter);
        }
        else {
          tree[chapter.tid] = chapter;
        }
      }

      // Place chapters under parents
      for (idx in chapters) {
        var chapter = chapters[idx];
        for (parentIdx in chapter.parents) {
          var parent = chapter.parents[parentIdx]; 
          if (!tree[parent].children) {
            tree[parent].children = [];
          }
          else {
            // children variable is ready
          }
          tree[parent].children.push(chapter);
        }
      }      

      var content = '';
      var forest = tree[0].children;
      content += '<ul>';
      for (idx in forest) {
        var chapter = forest[idx];
        content += '<li>' + themeChapter(chapter, selector) + '</li>';
      }
      content += '</ul>';
      $(selector).append(content);
      
    });
  }
  
  function loadSection (sectionID, selector) {
    $.getJSON('api/node/'+sectionID, function(response, status, request){
      var section = response;
      $(selector).append(section.title);
    });
  }
  
  function themeChapter (chapter) {
    var content = '';
    content += '<div id="'+chapter.tid+'" class="chapter">'+chapter.name+'</div>';
    if (chapter.sections) {
      content += '<ul class="sections">';
      for (idx in chapter.sections) {
        var sectionID = chapter.sections[idx];
        content += '<li id="'+sectionID+'" class="section"><a href="node/'+sectionID+'"></a></li>';
        loadSection(sectionID, '#'+sectionID+'.section a');
      }
      content += '</ul>';
    }
    if (chapter.children) {
      content += '<ul class="children">';
      for (idx in chapter.children) {
        var child = chapter.children[idx];
        content += '<li class="child">' + themeChapter(child) + '</li>';
      }
      content += '</ul>';
    }
    return content;
  }
  
})(jQuery);
