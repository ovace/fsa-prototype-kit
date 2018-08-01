//
'use strict';

//import './stylesheets/base.scss';

// import variable from webpack.common.js to reference FSA Style in node_modules
import 'fsaStyleScss';

var baseTemplate = require('./includes/base.hbs');

document.addEventListener("DOMContentLoaded", function() {
	document.body.appendChild( 
    baseTemplate(
      { 
        pageTitle: "Handlebars Template",
        pageHeader: "Baseline Handlebars Application"
      }
    )
  );
});
