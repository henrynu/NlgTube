define("echarts/chart/k",["require","./base","../util/shape/Candle","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","zrender/tool/util","../chart"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.refresh(a)}var i=e("./base"),n=e("../util/shape/Candle");e("../component/axis"),e("../component/grid"),e("../component/dataZoom");var a=e("../config");a.k={zlevel:0,z:2,clickable:!0,hoverable:!0,legendHoverLink:!1,xAxisIndex:0,yAxisIndex:0,itemStyle:{normal:{color:"#fff",color0:"#00aa11",lineStyle:{width:1,color:"#ff3200",color0:"#00aa11"},label:{show:!1}},emphasis:{label:{show:!1}}}};var o=e("../util/ecData"),r=e("zrender/tool/util");return t.prototype={type:a.CHART_TYPE_K,_buildShape:function(){var e=this.series;this.selectedMap={};for(var t,i={top:[],bottom:[]},n=0,o=e.length;o>n;n++)e[n].type===a.CHART_TYPE_K&&(e[n]=this.reformOption(e[n]),this.legendHoverLink=e[n].legendHoverLink||this.legendHoverLink,t=this.component.xAxis.getAxis(e[n].xAxisIndex),t.type===a.COMPONENT_TYPE_AXIS_CATEGORY&&i[t.getPosition()].push(n));for(var r in i)i[r].length>0&&this._buildSinglePosition(r,i[r]);this.addShapeList()},_buildSinglePosition:function(e,t){var i=this._mapData(t),n=i.locationMap,a=i.maxDataLength;if(0!==a&&0!==n.length){this._buildHorizontal(t,a,n);for(var o=0,r=t.length;r>o;o++)this.buildMark(t[o])}},_mapData:function(e){for(var t,i,n=this.series,a=this.component.legend,o=[],r=0,s=0,l=e.length;l>s;s++)t=n[e[s]],i=t.name,this.selectedMap[i]=a?a.isSelected(i):!0,this.selectedMap[i]&&o.push(e[s]),r=Math.max(r,t.data.length);return{locationMap:o,maxDataLength:r}},_buildHorizontal:function(e,t,i){for(var n,a,o,r,s,l,h,d,c,m,p=this.series,u={},g=0,V=i.length;V>g;g++){n=i[g],a=p[n],o=a.xAxisIndex||0,r=this.component.xAxis.getAxis(o),h=a.barWidth||Math.floor(r.getGap()/2),m=a.barMaxWidth,m&&h>m&&(h=m),s=a.yAxisIndex||0,l=this.component.yAxis.getAxis(s),u[n]=[];for(var U=0,y=t;y>U&&null!=r.getNameByIndex(U);U++)d=a.data[U],c=this.getDataFromOption(d,"-"),"-"!==c&&4==c.length&&u[n].push([r.getCoordByIndex(U),h,l.getCoord(c[0]),l.getCoord(c[1]),l.getCoord(c[2]),l.getCoord(c[3]),U,r.getNameByIndex(U)])}this._buildKLine(e,u)},_buildKLine:function(e,t){for(var i,n,o,r,s,l,h,d,c,m,p,u,g,V,U,y,f,_=this.series,b=0,x=e.length;x>b;b++)if(f=e[b],p=_[f],V=t[f],this._isLarge(V)&&(V=this._getLargePointList(V)),p.type===a.CHART_TYPE_K&&null!=V){u=p,i=this.query(u,"itemStyle.normal.lineStyle.width"),n=this.query(u,"itemStyle.normal.lineStyle.color"),o=this.query(u,"itemStyle.normal.lineStyle.color0"),r=this.query(u,"itemStyle.normal.color"),s=this.query(u,"itemStyle.normal.color0"),l=this.query(u,"itemStyle.emphasis.lineStyle.width"),h=this.query(u,"itemStyle.emphasis.lineStyle.color"),d=this.query(u,"itemStyle.emphasis.lineStyle.color0"),c=this.query(u,"itemStyle.emphasis.color"),m=this.query(u,"itemStyle.emphasis.color0");for(var k=0,v=V.length;v>k;k++)U=V[k],g=p.data[U[6]],u=g,y=U[3]<U[2],this.shapeList.push(this._getCandle(f,U[6],U[7],U[0],U[1],U[2],U[3],U[4],U[5],y?this.query(u,"itemStyle.normal.color")||r:this.query(u,"itemStyle.normal.color0")||s,this.query(u,"itemStyle.normal.lineStyle.width")||i,y?this.query(u,"itemStyle.normal.lineStyle.color")||n:this.query(u,"itemStyle.normal.lineStyle.color0")||o,y?this.query(u,"itemStyle.emphasis.color")||c||r:this.query(u,"itemStyle.emphasis.color0")||m||s,this.query(u,"itemStyle.emphasis.lineStyle.width")||l||i,y?this.query(u,"itemStyle.emphasis.lineStyle.color")||h||n:this.query(u,"itemStyle.emphasis.lineStyle.color0")||d||o))}},_isLarge:function(e){return e[0][1]<.5},_getLargePointList:function(e){for(var t=this.component.grid.getWidth(),i=e.length,n=[],a=0;t>a;a++)n[a]=e[Math.floor(i/t*a)];return n},_getCandle:function(e,t,i,a,r,s,l,h,d,c,m,p,u,g,V){var U=this.series,y=U[e],f=y.data[t],_=[f,y],b={zlevel:this.getZlevelBase(),z:this.getZBase(),clickable:this.deepQuery(_,"clickable"),hoverable:this.deepQuery(_,"hoverable"),style:{x:a,y:[s,l,h,d],width:r,color:c,strokeColor:p,lineWidth:m,brushType:"both"},highlightStyle:{color:u,strokeColor:V,lineWidth:g},_seriesIndex:e};return b=this.addLabel(b,y,f,i),o.pack(b,y,e,f,t,i),b=new n(b)},getMarkCoord:function(e,t){var i=this.series[e],n=this.component.xAxis.getAxis(i.xAxisIndex),a=this.component.yAxis.getAxis(i.yAxisIndex);return["string"!=typeof t.xAxis&&n.getCoordByIndex?n.getCoordByIndex(t.xAxis||0):n.getCoord(t.xAxis||0),"string"!=typeof t.yAxis&&a.getCoordByIndex?a.getCoordByIndex(t.yAxis||0):a.getCoord(t.yAxis||0)]},refresh:function(e){e&&(this.option=e,this.series=e.series),this.backupShapeList(),this._buildShape()},addDataAnimation:function(e,t){function i(){u--,0===u&&t&&t()}for(var n=this.series,a={},r=0,s=e.length;s>r;r++)a[e[r][0]]=e[r];for(var l,h,d,c,m,p,u=0,r=0,s=this.shapeList.length;s>r;r++)if(m=this.shapeList[r]._seriesIndex,a[m]&&!a[m][3]&&"candle"===this.shapeList[r].type){if(p=o.get(this.shapeList[r],"dataIndex"),c=n[m],a[m][2]&&p===c.data.length-1){this.zr.delShape(this.shapeList[r].id);continue}if(!a[m][2]&&0===p){this.zr.delShape(this.shapeList[r].id);continue}h=this.component.xAxis.getAxis(c.xAxisIndex||0).getGap(),l=a[m][2]?h:-h,d=0,u++,this.zr.animate(this.shapeList[r].id,"").when(this.query(this.option,"animationDurationUpdate"),{position:[l,d]}).done(i).start()}u||t&&t()}},r.inherits(t,i),e("../chart").define("k",t),t});