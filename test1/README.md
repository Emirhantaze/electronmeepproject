  #test1

    To be able to use that, node.js ((and for windows development tools
      )  
    https://www.npmjs.com/package/node-pty?activeTab=readme
    but maybe this not problem in your case so at first try without them)
    have to be installed properly

      watch this tutorial according to your operating system(you have to use administer rights)
      https://github.com/nodejs/node-gyp#installation


    usage;
    (At this step you have to open your terminal/cmd/bash with administer rights)

    npm install

    npm run rebuild

    npm start

    once you have completed every time when you use
    $ npm install also use
    $npm run rebuild or $\node_modules\.bin\electron-rebuild
    second one only needed if rebuild is not defined in package.json
