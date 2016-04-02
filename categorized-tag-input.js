!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.CategorizedTagInput=t(require("react")):e.CategorizedTagInput=t(e.React)}(this,function(e){return function(e){function t(n){if(s[n])return s[n].exports;var i=s[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var s={};return t.m=e,t.c=s,t.p="",t(0)}([function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=s(3),a=n(i);t["default"]=a["default"],e.exports=t["default"]},function(t,s){t.exports=e},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=s(1),a=n(i),r=a["default"].PropTypes,o=a["default"].createClass({displayName:"Tag",propTypes:{selected:r.bool,input:r.string.isRequired,text:r.string.isRequired,addable:r.bool,deletable:r.bool,onAdd:r.func,onDelete:r.func,style:r.object},tagContent:function(){var e=[],t=this.props.text.trim().toLowerCase().indexOf(this.props.input.trim().toLowerCase()),s=t+this.props.input.length;return t>0&&e.push(a["default"].createElement("span",{key:1,className:"cti__tag__content--regular"},this.props.text.substring(0,t))),e.push(a["default"].createElement("span",{key:2,className:"cti__tag__content--match"},this.props.text.substring(t,s))),s<this.props.text.length&&e.push(a["default"].createElement("span",{key:3,className:"cti__tag__content--regular"},this.props.text.substring(s))),e},onClick:function(e){e.preventDefault(),this.props.addable&&this.props.onAdd(e)},onDelete:function(e){e.preventDefault(),e.stopPropagation(),this.props.onDelete(e)},getDeleteBtn:function(){var e=this.props.style||{},t=e["delete"]?e["delete"]:{};return a["default"].createElement("span",{className:"cti__tag__delete",onClick:this.onDelete,dangerouslySetInnerHTML:{__html:"&times;"},style:t})},render:function(){var e=null;this.props.deletable&&(e=this.getDeleteBtn());var t="cti__tag"+(this.props.selected?" cti-selected":""),s=this.props.style||{};return a["default"].createElement("div",{className:t,onClick:this.onClick,style:s.base||{}},a["default"].createElement("div",{className:"cti__tag__content",style:s.content||{}},this.tagContent()),e)}});t["default"]=o,e.exports=t["default"]},function(e,t,s){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}function i(e){return e&&e.__esModule?e:{"default":e}}function a(e){return"string"==typeof e&&e.trim().length>0}function r(e){return"object"==typeof e&&e.id&&e.title&&e.items&&Array.isArray(e.items)&&e.items.every(a)&&(e.type||e.single)}Object.defineProperty(t,"__esModule",{value:!0}),t.isCategoryItemValid=a,t.isCategoryValid=r;var o=s(1),l=i(o),u=s(5),c=i(u),p=s(6),d=i(p),h=s(7),f=n(h),g=l["default"].PropTypes,m=l["default"].createClass({displayName:"CategorizedTagInput",propTypes:{addNew:g.bool,categories:g.arrayOf(g.object).isRequired,transformTag:g.func,value:g.arrayOf(g.string),onBlur:g.func,onChange:g.func,placeholder:g.string,getTagStyle:g.func},getInitialState:function(){return{value:"",selection:{item:0,category:0},panelOpened:!1,tags:this.props.value||[],categories:[],addNew:void 0===this.props.addNew?!0:this.props.addNew}},componentWillMount:function(){if(!this.props.categories.every(r))throw new Error("invalid categories source provided for react-categorized-tag-input")},componentWillUnmount:function(){this.timeout&&clearTimeout(this.timeout)},filterCategories:function(e){var t=this,s=this.props.categories.map(function(s){return s=Object.assign({},s,{items:s.items.filter(t.filterItems(e))}),0!==s.items.length||t.state.addNew&&!s.single?s:null}).filter(function(e){return null!==e}),n=this.state.selection;this.state.selection.category>=s.length?n={category:0,item:0}:n.item>=s[n.category].items.length&&(n.item=0),this.setState({categories:s,selection:n})},filterItems:function(e){return function(t){return 1===e.length?t.toLowerCase().trim()===e:t.toLowerCase().indexOf(e.trim().toLowerCase())>=0}},openPanel:function(){this.setState({panelOpened:!0})},closePanel:function(){var e=this;this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.timeout=void 0,e.setState({panelOpened:!1})},150)},onValueChange:function(e){var t=e.target.value;this.setState({value:t,panelOpened:t.trim().length>0||!isNaN(Number(t.trim()))}),this.filterCategories(t)},onTagDeleted:function(e){var t=this.state.tags.slice(0,e).concat(this.state.tags.slice(e+1));this.setState({tags:t}),"function"==typeof this.props.onChange&&this.props.onChange(t)},onAdd:function(e){var t=e.category,s=e.item;"function"==typeof this.props.transformTag&&(s=this.props.transformTag(t,s));var n=this.state.tags.concat([s]);this.setState({tags:n,value:"",panelOpened:!0}),this.refs.input.focusInput(),"function"==typeof this.props.onChange&&this.props.onChange(n)},addSelectedTag:function(){if(this.state.panelOpened&&this.state.value.length>0){var e=this.state.categories[this.state.selection.category],t=e.items[this.state.selection.item];this.onAdd({category:e.id,item:t||this.state.value})}},handleBackspace:function(e){0===this.state.value.trim().length&&(e.preventDefault(),this.onTagDeleted(this.state.tags.length-1))},handleArrowLeft:function(){var e=this.state.selection.item-1;this.setState({selection:{category:this.state.selection.category,item:e>=0?e:0}})},handleArrowUp:function(){var e=this.state.selection.category-1;this.setState({selection:{category:e>=0?e:0,item:0}})},handleArrowRight:function(){var e=this.state.selection.item+1,t=this.state.categories[this.state.selection.category];this.setState({selection:{category:this.state.selection.category,item:e<=t.items.length?e:t.items.length}})},handleArrowDown:function(){var e=this.state.selection.category+1,t=this.state.categories;this.setState({selection:{category:e<t.length?e:t.length-1,item:0}})},onKeyDown:function(e){switch(e.keyCode){case f.TAB:case f.ENTER:if(!this.state.value)break;case f.COMMA:e.preventDefault(),this.addSelectedTag();break;case f.BACKSPACE:this.handleBackspace(e);break;case f.LEFT:this.handleArrowLeft();break;case f.UP:this.handleArrowUp();break;case f.RIGHT:this.handleArrowRight();break;case f.DOWN:this.handleArrowDown()}},value:function(){return this.state.tags},render:function(){return l["default"].createElement("div",{className:"cti__root"},l["default"].createElement(c["default"],{openPanel:this.openPanel,closePanel:this.closePanel,onValueChange:this.onValueChange,onTagDeleted:this.onTagDeleted,onKeyDown:this.onKeyDown,placeholder:this.props.placeholder,value:this.state.value,getTagStyle:this.props.getTagStyle,tags:this.state.tags,onBlur:this.props.onBlur,ref:"input"}),this.state.panelOpened&&this.state.value.length>0?l["default"].createElement(d["default"],{categories:this.state.categories,selection:this.state.selection,onAdd:this.onAdd,input:this.state.value,addNew:void 0===this.props.addNew?!0:this.props.addNew}):"")}});t["default"]=m},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=s(1),a=n(i),r=s(2),o=n(r),l=a["default"].PropTypes,u=a["default"].createClass({displayName:"Category",propTypes:{items:l.array.isRequired,category:l.oneOfType([l.string,l.number]).isRequired,title:l.string.isRequired,selected:l.bool.isRequired,selectedItem:l.number.isRequired,input:l.string.isRequired,addNew:l.bool,type:l.string,onAdd:l.func.isRequired,single:l.bool,getTagStyle:l.func},onAdd:function(e){var t=this;return function(){t.props.onAdd({category:t.props.category,item:e})}},onCreateNew:function(e){e.preventDefault(),this.onAdd(this.props.input)()},getTagStyle:function(e){return this.props.getTagStyle?this.props.getTagStyle(e):{}},itemToTag:function(e,t){return a["default"].createElement(o["default"],{selected:this.isSelected(t),input:this.props.input,text:e,addable:!0,deletable:!1,onAdd:this.onAdd(e),key:e+"_"+t,style:this.getTagStyle(e)})},fullMatchInItems:function(){for(var e=0,t=this.props.items.length;t>e;e++)if(this.props.items[e]===this.props.input)return!0;return!1},getItems:function(){return{items:this.props.items.map(this.itemToTag),fullMatch:this.fullMatchInItems()}},isSelected:function(e){return this.props.selected&&(e===this.props.selectedItem||this.props.single)},getAddBtn:function(e,t){return!this.props.addNew||e||this.props.single?null:[this.props.items.length>0?a["default"].createElement("span",{key:"cat_or",className:"cti__category__or"},"or"):null,a["default"].createElement("button",{key:"add_btn",className:"cti__category__add-item"+(t?" cti-selected":""),onClick:this.onCreateNew},"Create new "+(this.props.type||this.props.title)+(' "'+this.props.input+'"'))]},render:function(){var e=this.getItems(),t=e.items,s=e.fullMatch,n=this.getAddBtn(s,(0===t.length||this.props.selectedItem>=t.length)&&this.props.selected);return a["default"].createElement("div",{className:"cti__category"},a["default"].createElement("h5",{className:"cti__category__title"},this.props.title),a["default"].createElement("div",{className:"cti__category__tags"},t,n))}});t["default"]=u,e.exports=t["default"]},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=s(1),a=n(i),r=s(2),o=n(r),l=a["default"].PropTypes,u=a["default"].createClass({displayName:"Input",propTypes:{openPanel:l.func.isRequired,closePanel:l.func.isRequired,onValueChange:l.func.isRequired,onTagDeleted:l.func.isRequired,onKeyDown:l.func.isRequired,value:l.string.isRequired,tags:l.arrayOf(l.string).isRequired,placeholder:l.string,onBlur:l.func,getTagStyle:l.func},focusInput:function(){this.refs.input.focus()},getTags:function(){var e=this,t=this.props.getTagStyle||function(){};return this.props.tags.map(function(s,n){return a["default"].createElement(o["default"],{selected:!1,input:"",text:s,addable:!1,deletable:!0,key:s+"_"+n,onDelete:function(){return e.props.onTagDeleted(n)},style:t(s)})})},onBlur:function(e){this.props.closePanel(),"function"==typeof this.props.onBlur&&this.props.onBlur(e)},render:function(){var e=0===this.props.value.length?this.props.placeholder.length:this.props.value.length;return a["default"].createElement("div",{className:"cti__input",onClick:this.focusInput},this.getTags(),a["default"].createElement("input",{type:"text",ref:"input",value:this.props.value,size:e+2,onFocus:this.props.openPanel,onBlur:this.onBlur,onChange:this.props.onValueChange,onKeyDown:this.props.onKeyDown,placeholder:this.props.placeholder,"aria-label":this.props.placeholder,className:"cti__input__input"}),a["default"].createElement("div",{className:"cti__input__arrow"}))}});t["default"]=u,e.exports=t["default"]},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=s(1),a=n(i),r=s(4),o=n(r),l=a["default"].PropTypes,u=a["default"].createClass({displayName:"Panel",propTypes:{categories:l.arrayOf(l.object).isRequired,selection:l.object.isRequired,onAdd:l.func.isRequired,input:l.string.isRequired,addNew:l.bool,getTagStyle:l.func},getCategories:function(){var e=this;return this.props.categories.map(function(t,s){return a["default"].createElement(o["default"],{key:t.id,items:t.items,category:t.id,title:t.title,selected:e.props.selection.category===s,selectedItem:e.props.selection.item,input:e.props.input,addNew:e.props.addNew,type:t.type,onAdd:e.props.onAdd,single:t.single,getTagStyle:e.props.getTagStyle})})},render:function(){return a["default"].createElement("div",{className:"cti__panel"},this.getCategories())}});t["default"]=u,e.exports=t["default"]},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=9;t.TAB=s;var n=13;t.ENTER=n;var i=8;t.BACKSPACE=i;var a=37;t.LEFT=a;var r=38;t.UP=r;var o=39;t.RIGHT=o;var l=40;t.DOWN=l;var u=188;t.COMMA=u}])});
//# sourceMappingURL=categorized-tag-input.js.map