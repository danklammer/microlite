/*

  microLite.js
  --------------------------
  An uber small 1kb lightbox

*/

function microLite(i) {
  
  // Create variables for highly used elements
  var childNode = i.children[0];
  var body = document.body;

  // Create MicroLite (#ml)
  var mlite = document.createElement('div');
  mlite.setAttribute('id', 'ml');

  // Set onClick so MicroLite can be distroyed from DOM when clicked
  mlite.setAttribute('onclick', 'this.classList.remove("s"); this.addEventListener("transitionend", function(){ this.remove() })');

  // Create Image container with inpage <styles>
  mlite.innerHTML = '<div class="mli"></div><style>#ml{cursor:pointer;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,10,10,0);transition:background .5s ease}.mli{background:url(' + i.href + ')no-repeat center,url(' + childNode.src + ')no-repeat center;background-size:contain;width:' + childNode.width + 'px;height:' + childNode.height + 'px;margin:' + parseInt(childNode.offsetTop - body.scrollTop) + 'px 0 0 ' + childNode.offsetLeft + 'px;transition:all .5s ease}#ml.s{background:rgba(10,10,10,.8)}.s .mli{width:92vw;height:92vh;margin:4vh 4vw !important}</style>';
  
  // Append MicroLite to bottom of page
  body.appendChild(mlite);

  // Need a short time gap to allow CSS transition to occur
  setTimeout(function() {
    mlite.classList.add('s');
  }, 20);

  // Update image margin top if scrolled while lightbox is open so it can pop back into place when closed
  window.addEventListener('scroll', function() {

    if (document.getElementById('ml')) {
        document.querySelector('.mli').style.marginTop = parseInt(childNode.offsetTop - body.scrollTop) + 'px';
    }

  });

  // Prevent browser from forcing default <a> click behavior
  event.preventDefault();

}

