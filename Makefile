all:
	./node_modules/browserify/bin/cmd.js src/index.js -o bundle.js
resources.html:
	wget -O resources.html http://festivalofco.de/resources
