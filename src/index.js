//
'use strict';


// import variable from webpack.common.js to reference FSA Style in node_modules
import 'fsaStyleScss';
import './stylesheets/base.scss';

var baseTemplate = require('./includes/base.hbs');

document.addEventListener("DOMContentLoaded", function() {

  baseTemplate(
    {
      pageTitle: "Handlebars Template",
      pageHeader: "Baseline Handlebars Application"
    }
  );

  //document.body.appendChild( newNode );
});
