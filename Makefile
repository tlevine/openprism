all:
	browserify src/index.js -o bundle.js
resources.html:
	wget -O resources.html http://festivalofco.de/resources
