define("echarts/chart/tree",["require","./base","../util/shape/Icon","zrender/shape/Image","zrender/shape/Line","zrender/shape/BezierCurve","../layout/Tree","../data/Tree","../config","../util/ecData","zrender/config","zrender/tool/event","zrender/tool/util","../chart"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.refresh(a)}var i=e("./base"),n=.618,a=e("../util/shape/Icon"),o=e("zrender/shape/Image"),r=e("zrender/shape/Line"),s=e("zrender/shape/BezierCurve"),l=e("../layout/Tree"),h=e("../data/Tree"),m=e("../config");m.tree={zlevel:1,z:2,calculable:!1,clickable:!0,rootLocation:{},orient:"vertical",symbol:"circle",symbolSize:20,nodePadding:30,layerPadding:100,itemStyle:{normal:{label:{show:!0},lineStyle:{width:1,color:"#777",type:"curve"}},emphasis:{}}};var V=e("../util/ecData"),U=(e("zrender/config"),e("zrender/tool/event"),e("zrender/tool/util"));return t.prototype={type:m.CHART_TYPE_TREE,_buildShape:function(e,t){var i=e.data[0];this.tree=h.fromOptionData(i.name,i.children),this.tree.root.data=i,this._setTreeShape(e),this.tree.traverse(function(i){this._buildItem(i,e,t),i.children.length>0&&this._buildLink(i,e)},this);var n=e.roam===!0||"move"===e.roam,a=e.roam===!0||"scale"===e.roam;this.zr.modLayer(this.getZlevelBase(),{panable:n,zoomable:a}),(this.query("markPoint.effect.show")||this.query("markLine.effect.show"))&&this.zr.modLayer(m.EFFECT_ZLEVEL,{panable:n,zoomable:a}),this.addShapeList()},_buildItem:function(e,t,i){var n=[e.data,t],r=this.deepQuery(n,"symbol"),s=this.deepMerge(n,"itemStyle.normal")||{},l=this.deepMerge(n,"itemStyle.emphasis")||{},h=s.color||this.zr.getColor(),m=l.color||this.zr.getColor(),U=-e.layout.angle||0;e.id===this.tree.root.id&&(U=0);var d="right";Math.abs(U)>=Math.PI/2&&Math.abs(U)<3*Math.PI/2&&(U+=Math.PI,d="left");var p=[U,e.layout.position[0],e.layout.position[1]],c=new a({zlevel:this.getZlevelBase(),z:this.getZBase()+1,rotation:p,style:{x:e.layout.position[0]-.5*e.layout.width,y:e.layout.position[1]-.5*e.layout.height,width:e.layout.width,height:e.layout.height,iconType:r,color:h,brushType:"both",lineWidth:s.borderWidth,strokeColor:s.borderColor},highlightStyle:{color:m,lineWidth:l.borderWidth,strokeColor:l.borderColor}});c.style.iconType.match("image")&&(c.style.image=c.style.iconType.replace(new RegExp("^image:\\/\\/"),""),c=new o({rotation:p,style:c.style,highlightStyle:c.highlightStyle,clickable:c.clickable,zlevel:this.getZlevelBase(),z:this.getZBase()})),this.deepQuery(n,"itemStyle.normal.label.show")&&(c.style.text=null==e.data.label?e.id:e.data.label,c.style.textPosition=this.deepQuery(n,"itemStyle.normal.label.position"),"radial"===t.orient&&"inside"!==c.style.textPosition&&(c.style.textPosition=d),c.style.textColor=this.deepQuery(n,"itemStyle.normal.label.textStyle.color"),c.style.textFont=this.getFont(this.deepQuery(n,"itemStyle.normal.label.textStyle")||{})),this.deepQuery(n,"itemStyle.emphasis.label.show")&&(c.highlightStyle.textPosition=this.deepQuery(n,"itemStyle.emphasis.label.position"),c.highlightStyle.textColor=this.deepQuery(n,"itemStyle.emphasis.label.textStyle.color"),c.highlightStyle.textFont=this.getFont(this.deepQuery(n,"itemStyle.emphasis.label.textStyle")||{})),V.pack(c,t,i,e.data,0,e.id),this.shapeList.push(c)},_buildLink:function(e,t){var i=t.itemStyle.normal.lineStyle;if("broken"===i.type)return void this._buildBrokenLine(e,i,t);for(var n=0;n<e.children.length;n++){var a=e.layout.position[0],o=e.layout.position[1],r=e.children[n].layout.position[0],s=e.children[n].layout.position[1];switch(i.type){case"curve":this._buildBezierCurve(e,e.children[n],i,t);break;case"broken":break;default:var l=this._getLine(a,o,r,s,i);this.shapeList.push(l)}}},_buildBrokenLine:function(e,t,i){var a=U.clone(t);a.type="solid";var o=[],r=e.layout.position[0],s=e.layout.position[1],l=i.orient,h=e.children[0].layout.position[1],m=r,V=s+(h-s)*(1-n),d=e.children[0].layout.position[0],p=V,c=e.children[e.children.length-1].layout.position[0],u=V;if("horizontal"===l){var y=e.children[0].layout.position[0];m=r+(y-r)*(1-n),V=s,d=m,p=e.children[0].layout.position[1],c=m,u=e.children[e.children.length-1].layout.position[1]}o.push(this._getLine(r,s,m,V,a)),o.push(this._getLine(d,p,c,u,a));for(var g=0;g<e.children.length;g++)y=e.children[g].layout.position[0],h=e.children[g].layout.position[1],"horizontal"===l?p=h:d=y,o.push(this._getLine(d,p,y,h,a));this.shapeList=this.shapeList.concat(o)},_getLine:function(e,t,i,n,a){return e===i&&(e=i=this.subPixelOptimize(e,a.width)),t===n&&(t=n=this.subPixelOptimize(t,a.width)),new r({zlevel:this.getZlevelBase(),hoverable:!1,style:U.merge({xStart:e,yStart:t,xEnd:i,yEnd:n,lineType:a.type,strokeColor:a.color,lineWidth:a.width},a,!0)})},_buildBezierCurve:function(e,t,i,a){var o=n,r=a.orient,l=e.layout.position[0],h=e.layout.position[1],m=t.layout.position[0],V=t.layout.position[1],d=l,p=(V-h)*o+h,c=m,u=(V-h)*(1-o)+h;if("horizontal"===r)d=(m-l)*o+l,p=h,c=(m-l)*(1-o)+l,u=V;else if("radial"===r)if(e.id===this.tree.root.id)d=(m-l)*o+l,p=(V-h)*o+h,c=(m-l)*(1-o)+l,u=(V-h)*(1-o)+h;else{var y=e.layout.originPosition[0],g=e.layout.originPosition[1],b=t.layout.originPosition[0],f=t.layout.originPosition[1],k=this.tree.root.layout.position[0],x=this.tree.root.layout.position[1];d=y,p=(f-g)*o+g,c=b,u=(f-g)*(1-o)+g;var _=(d-this.minX)/this.width*Math.PI*2;d=p*Math.cos(_)+k,p=p*Math.sin(_)+x,_=(c-this.minX)/this.width*Math.PI*2,c=u*Math.cos(_)+k,u=u*Math.sin(_)+x}var L=new s({zlevel:this.getZlevelBase(),hoverable:!1,style:U.merge({xStart:l,yStart:h,cpX1:d,cpY1:p,cpX2:c,cpY2:u,xEnd:m,yEnd:V,strokeColor:i.color,lineWidth:i.width},i,!0)});this.shapeList.push(L)},_setTreeShape:function(e){var t=new l({nodePadding:e.nodePadding,layerPadding:e.layerPadding});this.tree.traverse(function(t){var i=[t.data,e],n=this.deepQuery(i,"symbolSize");"number"==typeof n&&(n=[n,n]),t.layout={width:n[0],height:n[1]}},this),t.run(this.tree);var i=e.orient,n=e.rootLocation.x,a=e.rootLocation.y,o=this.zr.getWidth(),r=this.zr.getHeight();n="center"===n?.5*o:this.parsePercent(n,o),a="center"===a?.5*r:this.parsePercent(a,r),a=this.parsePercent(a,r),"horizontal"===i&&(n=isNaN(n)?10:n,a=isNaN(a)?.5*r:a),"radial"===i?(n=isNaN(n)?.5*o:n,a=isNaN(a)?.5*r:a):(n=isNaN(n)?.5*o:n,a=isNaN(a)?10:a);var s=this.tree.root.layout.position[0];if("radial"===i){var h=1/0,m=0,V=0;this.tree.traverse(function(e){m=Math.max(m,e.layout.position[0]),h=Math.min(h,e.layout.position[0]),V=Math.max(V,e.layout.width)}),this.width=m-h+2*V,this.minX=h}this.tree.traverse(function(e){var t=e.layout.position[0]-s+n,o=e.layout.position[1]+a;if("horizontal"===i&&(o=e.layout.position[0]-s+a,t=e.layout.position[1]+n),"radial"===i){t=e.layout.position[0],o=e.layout.position[1],e.layout.originPosition=[t,o];var r=o,l=(t-h)/this.width*Math.PI*2;t=r*Math.cos(l)+n,o=r*Math.sin(l)+a,e.layout.angle=l}e.layout.position[0]=t,e.layout.position[1]=o},this)},refresh:function(e){this.clear(),e&&(this.option=e,this.series=this.option.series);for(var t=this.series,i=this.component.legend,n=0;n<t.length;n++)if(t[n].type===m.CHART_TYPE_TREE){t[n]=this.reformOption(t[n]);var a=t[n].name||"";if(this.selectedMap[a]=i?i.isSelected(a):!0,!this.selectedMap[a])continue;this._buildSeries(t[n],n)}},_buildSeries:function(e,t){this._buildShape(e,t)}},U.inherits(t,i),e("../chart").define("tree",t),t}),define("echarts/layout/Tree",["require","zrender/tool/vector"],function(e){function t(e){e=e||{},this.nodePadding=e.nodePadding||30,this.layerPadding=e.layerPadding||100,this._layerOffsets=[],this._layers=[]}var i=e("zrender/tool/vector");return t.prototype.run=function(e){this._layerOffsets.length=0;for(var t=0;t<e.root.height+1;t++)this._layerOffsets[t]=0,this._layers[t]=[];this._updateNodeXPosition(e.root);var i=e.root;this._updateNodeYPosition(i,0,i.layout.height)},t.prototype._updateNodeXPosition=function(e){var t=1/0,n=-(1/0);e.layout.position=e.layout.position||i.create();for(var a=0;a<e.children.length;a++){var o=e.children[a];this._updateNodeXPosition(o);var r=o.layout.position[0];t>r&&(t=r),r>n&&(n=r)}e.layout.position[0]=e.children.length>0?(t+n)/2:0;var s=this._layerOffsets[e.depth]||0;if(s>e.layout.position[0]){var l=s-e.layout.position[0];this._shiftSubtree(e,l);for(var a=e.depth+1;a<e.height+e.depth;a++)this._layerOffsets[a]+=l}this._layerOffsets[e.depth]=e.layout.position[0]+e.layout.width+this.nodePadding,this._layers[e.depth].push(e)},t.prototype._shiftSubtree=function(e,t){e.layout.position[0]+=t;for(var i=0;i<e.children.length;i++)this._shiftSubtree(e.children[i],t)},t.prototype._updateNodeYPosition=function(e,t,i){e.layout.position[1]=t;for(var n=0,a=0;a<e.children.length;a++)n=Math.max(e.children[a].layout.height,n);var o=this.layerPadding;"function"==typeof o&&(o=o(e.depth));for(var a=0;a<e.children.length;a++)this._updateNodeYPosition(e.children[a],t+o+i,n)},t}),define("echarts/data/Tree",["require","zrender/tool/util"],function(e){function t(e,t){this.id=e,this.depth=0,this.height=0,this.children=[],this.parent=null,this.data=t||null}function i(e){this.root=new t(e)}var n=e("zrender/tool/util");return t.prototype.add=function(e){var t=this.children;e.parent!==this&&(t.push(e),e.parent=this)},t.prototype.remove=function(e){var t=this.children,i=n.indexOf(t,e);i>=0&&(t.splice(i,1),e.parent=null)},t.prototype.traverse=function(e,t){e.call(t,this);for(var i=0;i<this.children.length;i++)this.children[i].traverse(e,t)},t.prototype.updateDepthAndHeight=function(e){var t=0;this.depth=e;for(var i=0;i<this.children.length;i++){var n=this.children[i];n.updateDepthAndHeight(e+1),n.height>t&&(t=n.height)}this.height=t+1},t.prototype.getNodeById=function(e){if(this.id===e)return this;for(var t=0;t<this.children.length;t++){var i=this.children[t].getNodeById(e);if(i)return i}},i.prototype.traverse=function(e,t){this.root.traverse(e,t)},i.prototype.getSubTree=function(e){var t=this.getNodeById(e);if(t){var n=new i(t.id);return n.root=t,n}},i.prototype.getNodeById=function(e){return this.root.getNodeById(e)},i.fromOptionData=function(e,n){function a(e,i){var n=new t(e.name,e);i.add(n);var o=e.children;if(o)for(var r=0;r<o.length;r++)a(o[r],n)}var o=new i(e),r=o.root;r.data={name:e,children:n};for(var s=0;s<n.length;s++)a(n[s],r);return o.root.updateDepthAndHeight(0),o},i.fromGraph=function(e){function n(t){for(var i=e.getNodeById(t.id),a=0;a<i.outEdges.length;a++){var r=i.outEdges[a],s=o[r.node2.id];t.children.push(s),n(s)}}for(var a={},o={},r=0;r<e.nodes.length;r++){var s,l=e.nodes[r];0===l.inDegree()?(a[l.id]=new i(l.id),s=a[l.id].root):s=new t(l.id),s.data=l.data,o[l.id]=s}var h=[];for(var m in a)n(a[m].root),a[m].root.updateDepthAndHeight(0),h.push(a[m]);return h},i});