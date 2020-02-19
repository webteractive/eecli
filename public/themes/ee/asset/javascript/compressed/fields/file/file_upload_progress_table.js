"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
function FileUploadProgressTable(e){return React.createElement("div",{className:"field-file-upload__table"},React.createElement("div",{className:"tbl-wrap"},React.createElement("table",{className:"tbl-fixed tables--uploads"},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("th",null,EE.lang.file_dnd_file_name),React.createElement("th",null,EE.lang.file_dnd_progress)),e.files.map(function(t){return React.createElement("tr",{key:t.name},React.createElement("td",null,(t.error||t.duplicate)&&React.createElement("span",{className:"icon--issue"}),t.name),React.createElement("td",null,t.error,t.error&&React.createElement("span",null," ",React.createElement("a",{href:"#",onClick:function(n){return e.onFileErrorDismiss(n,t)}},EE.lang.file_dnd_dismiss)),t.duplicate&&React.createElement(ResolveFilenameConflict,{file:t,onResolveConflict:e.onResolveConflict,onFileUploadCancel:function(n){return e.onFileErrorDismiss(n,t)}}),!t.error&&!t.duplicate&&React.createElement("div",{className:"progress-bar"},React.createElement("div",{className:"progress",style:{width:t.progress+"%"}}))))})))))}var ResolveFilenameConflict=function(e){function t(){var e,n;_classCallCheck(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=_possibleConstructorReturn(this,(e=_getPrototypeOf(t)).call.apply(e,[this].concat(o))),_defineProperty(_assertThisInitialized(_assertThisInitialized(n)),"resolveConflict",function(e,t){e.preventDefault();var r=$(".modal-file");$("div.box",r).html("<iframe></iframe>");var o=$("iframe",r);o.css({border:"none",width:"100%"});var l={file_id:t.fileId,original_name:t.originalFileName},i=EE.dragAndDrop.resolveConflictEndpoint+"&"+$.param(l);o.attr("src",i),r.find("div.box").html(o),o.load(function(){var e=o.contents().find("body").text();try{return e=JSON.parse(e),r.trigger("modal:close"),e.cancel?n.props.onFileUploadCancel(l,t):n.props.onResolveConflict(t,e)}catch(l){var i=o.contents().find("body").height();$(".box",r).height(i),o.height(i)}$(o[0].contentWindow).on("unload",function(){o.hide(),$(".box",r).height("auto"),$(r).height("auto")})})}),n}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){var e=this;return React.createElement("a",{href:"#",className:"m-link",rel:"modal-file",onClick:function(t){return e.resolveConflict(t,e.props.file)}},EE.lang.file_dnd_resolve_conflict)}}]),t}(React.Component);