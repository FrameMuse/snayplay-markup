var x = new XMLHttpRequest();
var dragSrcEl = null;
var first_id = null;
var first_offset = null;
var second_id = null;
var second_offset = null;
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

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
        first_id = this.getAttribute("id");
        first_offset = this.getAttribute("offset");
        
        second_id = dragSrcEl.getAttribute("id");
        second_offset = dragSrcEl.getAttribute("offset");
        
        
        
        this.setAttribute("offset", second_offset);
        dragSrcEl.setAttribute("offset", first_offset);
        //alert("First - " + first + "; Second = " + second);
        
        
        x.open("GET", "/admin/handler.php?method=move&first[id]="+first_id+"&first[offset]="+first_offset+"&second[id]="+second_id+"&second[offset]="+second_offset, false);
        //x.onload = function (){
            //alert(x.responseText);
        //}
        x.send();
        
        dragSrcEl.innerHTML = this.innerHTML;
        //dragSrcEl.firstChild.innerHTML = first_offset;
        this.innerHTML = e.dataTransfer.getData('text/html');
        //this.firstChild.innerHTML = second_offset;
        //alert(this.firstChild.innerHTML);
    }

    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';

    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });
}

var cols = document.querySelectorAll('table tr');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});