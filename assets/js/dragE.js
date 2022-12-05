var x = new XMLHttpRequest();
var dragSrcEl = null;
var first = null;
var second = null;

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    
    $(this).addClass("over");

  return false;
}

function handleDragEnter(e) {
  // this e.target is the current hover target.
    
    if (!$(this).is(".extra")) {
        $(".extra.before, .extra.after").remove();
        $(this).before("<tr class='drag extra before'><td>before</td></tr>");
        $(this).after("<tr class='drag extra after'><td>after</td></tr>");
        cols += document.querySelectorAll('.extra');
    } else {
        alert("NO");
    }
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this e.target is previous target element.
    //$(".extra.before, .extra.after").remove();
}

function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
        first = dragSrcEl.getAttribute("id");
        second = this.getAttribute("id");
        
        //alert("First - " + first + "; Second = " + second);
        x.open("GET", "/admin/handler.php?method=move&column="+column+"&first="+first+"&second="+second, false);
        x.send();
        
        dragSrcEl.innerHTML = this.innerHTML;
        dragSrcEl.setAttribute("id", second);
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.setAttribute("id", first);
    }

    dragSrcEl.style.opacity = '1';
    this.classList.remove('over');

    return false;
}

function handleDragEnd(e) {
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
        //$(".extra.before, .extra.after").remove();
    });
}

var cols = document.querySelectorAll('[draggable="true"]');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});