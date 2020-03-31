/*

microLite.js
--------------------------
An uber small 1kb lightbox

*/

function microLite(i) {

	// Create variables
	var childNode = i.children[0],
		body = document.body,
		zoomPadding = 50,
		windowWidth = window.innerWidth - (zoomPadding * 2),
		windowHeight = window.innerHeight - (zoomPadding * 2),
		imgWidth = childNode.width,
		imgHeight = childNode.height,
		imgX = childNode.offsetLeft,
		imgY = parseInt(childNode.offsetTop - (document.documentElement.scrollTop || body.scrollTop)),
		scaleX = windowWidth / imgWidth,
		scaleY = windowHeight / imgHeight,
		scaleMax = Math.min(scaleX, scaleY),
		mlite = document.createElement('div');

	// Determine if image is portait or landscape and set appropriate X + Y
	if (scaleX <= scaleY) {
		var zoomX = zoomPadding,
			zoomY = ((windowHeight - (imgHeight * scaleMax)) / 2) + zoomPadding;
	} else {
		var zoomX = ((windowWidth - (imgWidth * scaleMax)) / 2) + zoomPadding,
			zoomY = zoomPadding;
	}

	// Create a template string for the styling so that it's more readable
	var myInnerStyle = `
		<style>

		#ml {
			cursor:pointer;
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:100%
		}
			
		.mlbg {
			position:fixed;
			width:100%;
			height:100%;
			background:#0a0a0a;
			opacity:0;
			will-change:opacity;
			transition:opacity .4s ease
		}
		
		.mli {
			background:url(${i.href})no-repeat center,url(${childNode.src})no-repeat center;
			background-size:contain;
			width:${childNode.width}px;
			height:${childNode.height}px;
			transform:translate3d(${imgX}px, ${imgY}px, 0) scale(1);
			transform-origin:top left;
			will-change:transform;
			transition:transform .4s ease
		}
		
		.s .mlbg {
			opacity:0.8
		}
		
		.s .mli {
			transform: translate3d(${zoomX}px, ${zoomY}px, 0) scale(${scaleMax})
		}
		
		</style>`;

	// Give MicroLite an identifier
	mlite.setAttribute('id', 'ml');

	// Set onClick so MicroLite can be destroyed from DOM when clicked and reset overflow for body
	mlite.setAttribute(
		'onclick',
		'this.className = " "; addEventListener("transitionend", function() { if (this.parentNode) { this.parentNode.removeChild(this); } body.style.overflow = \'\'; });'
	);

	// Create image container with in-page <styles>
	mlite.innerHTML = '<div class="mlbg"></div><div class="mli"></div>' + myInnerStyle;

	// Append MicroLite to bottom of page
	body.appendChild(mlite);

	// Set a short time gap to allow CSS transition to occur
	setTimeout(function() {
		mlite.className = 's';
		body.style.overflow = 'hidden';  // Hide the scrollbar
	}, 20);

	// Add event listeners for escape key (to close), and wheel (to stop scrolling)
	['keydown', 'wheel'].forEach(function(action) {
		window.addEventListener(action, mliteEventHandler);
	});
}

// Event handler. Attaches events and also cancels them if image is closed.
function mliteEventHandler(e) {
	var mliteOpen = document.getElementById('ml');
	var isEscape = false;
	var isEnter = false;
	if (mliteOpen) {
		if (e.type === 'wheel') {
			e.preventDefault();
		} else {
			if ('key' in e) {
				isEscape = (e.key === 'Escape' || e.key === 'Esc');
				isEnter = (e.key === 'Enter');
			} else {
				isEscape = (e.keyCode === 27);
				isEnter = (e.keyCode === 13);
			}
			if (isEscape) {
				mliteOpen.className = ' ';
				document.body.style.overflow = '';
				addEventListener('transitionend', function() {
					if (mliteOpen.parentNode) {
						mliteOpen.parentNode.removeChild(mliteOpen);
					}
				});
			} else if (isEnter) {
				e.preventDefault();
			}
		}
	} else {

		// Remove event listeners if microlite isn't open any longer
		window.removeEventListener('keydown', mliteEventHandler);
		window.removeEventListener('wheel', mliteEventHandler);
	}
}