import $ from "jquery";
// import * as d3 from './../../../assets/js/d3.v3.min.js';
import * as d3 from './d3.v3.min.js';
import * as data from './data.json';
// import * as tip from './../../../assets/js/d3-tip.min.js';

var graph2 = (dom_element_to_append_to) => {
	
	// var data = {
	// 	"downward":{
	// 	  "direction":"downward",
	// 	  "name":"origin",
	// 	  "children":[
	// 		{
	// 		  "name":"qrohlf/trianglify (2014)",
	// 		  "children":[
	// 			{
	// 			  "name":"gstf/trianglify-wallpaper (2014)",
	// 			  "children":[]
	// 			},
	// 			{
	// 			  "name":"kimar/trianglify-api (2014)",
	// 			  "children":[
	// 				{
	// 				  "name":"NathanEpstein/D3xter (2014)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"andredumas/techan.js (2014)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"jiahuang/d3-timeline (2012)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"MinnPost/simple-map-d3 (2013)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"benkeen/d3pie (2013)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"lithiumtech/li-visualizations (2014)",
	// 				  "children":[]
	// 				}]
	// 			}
	// 		  ]
	// 		},
	// 		{
	// 		  "name":"andredumas/techan.js (2014)",
	// 		  "children":[]
	// 		}
	// 	  ]
	// 	},
	// 	"upward":{
	// 	  "direction":"upward",
	// 	  "name":"origin",
	// 	  "children":[
	// 		{
	// 		  "name":"tmpvar/jsdom (2010)",
	// 		  "children":[
	// 			{
	// 			  "name":"dperini/nwmatcher (2009)",
	// 			  "children":[]
	// 			},
	// 			{
	// 			  "name":"request/request (2011)",
	// 			  "children":[
	// 				{
	// 				  "name":"hapijs/qs (2014)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"rvagg/bl (2013)",
	// 				  "children":[
	// 					{
	// 					  "name":"iojs/readable-stream (2012)",
	// 					  "children":[
	// 						{
	// 						  "name":"isaacs/inherits (2011)",
	// 						  "children":[]
	// 						},
	// 						{
	// 						  "name":"juliangruber/isarray (2013)",
	// 						  "children":[]
	// 						},
	// 						{
	// 						  "name":"isaacs/core-util-is (2013)",
	// 						  "children":[]
	// 						},
	// 						{
	// 						  "name":"substack/string_decoder (2013)",
	// 						  "children":[]
	// 						},
	// 						{
	// 						  "name":"TooTallNate/util-deprecate (2014)",
	// 						  "children":[]
	// 						}
	// 					  ]
	// 					}
	// 				  ]
	// 				},
	// 				{
	// 				  "name":"broofa/node-uuid (2010)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"isaacs/json-stringify-safe (2013)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"mikeal/tunnel-agent (2013)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"request/caseless (2013)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"rvagg/isstream (2014)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"lelandtseng/form-data (2011)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"request/oauth-sign (2013)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"goinstant/tough-cookie (2011)",
	// 				  "children":[]
	// 				},
	// 				{
	// 				  "name":"jshttp/mime-types (2014)",
	// 				  "children":[
	// 					{
	// 					  "name":"jshttp/mime-db (2014)",
	// 					  "children":[]
	// 					}
	// 				  ]
	// 				},
	// 				{
	// 				  "name":"hueniverse/hawk (2012)",
	// 				  "children":[
	// 					{
	// 					  "name":"hapijs/hoek (2012)",
	// 					  "children":[]
	// 					},
	// 					{
	// 					  "name":"hapijs/boom (2013)",
	// 					  "children":[
	// 						{
	// 						  "repeated":true,
	// 						  "name":"hapijs/hoek (2012)",
	// 						  "children":[]
	// 						}
	// 					  ]
	// 					},
	// 					{
	// 					  "name":"hapijs/cryptiles (2013)",
	// 					  "children":[
	// 						{
	// 						  "repeated":true,
	// 						  "name":"hapijs/boom (2013)",
	// 						  "children":[]
	// 						}
	// 					  ]
	// 					},
	// 					{
	// 					  "name":"hueniverse/sntp (2013)",
	// 					  "children":[
	// 						{
	// 						  "repeated":true,
	// 						  "name":"hapijs/hoek (2012)",
	// 						  "children":[]
	// 						}
	// 					  ]
	// 					}
	// 				  ]
	// 				},
	// 				{
	// 				  "name":"request/forever-agent (2013)",
	// 				  "children":[]
	// 				}
	// 			  ]
	// 			},
	// 			{
	// 			  "name":"brianmcd/contextify (2011)",
	// 			  "children":[]
	// 			},
	// 			{
	// 			  "name":"inikulin/parse5 (2013)",
	// 			  "children":[]
	// 			},
	// 			{
	// 			  "name":"jsdom/xml-name-validator (2014)",
	// 			  "children":[]
	// 			},
	// 			{
	// 			  "name":"iriscouch/browser-request (2011)",
	// 			  "children":[]
	// 			},
	// 			{
	// 			  "name":"ilinsky/xmlhttprequest (2011)",
	// 			  "children":[]
	// 			}
	// 		  ]
	// 		}
	// 	  ]
	// 	}
	//   }


	/**
	 * Initialize tree chart object and data loading.
	 */
	var treeChart = function(d3Object) {
		this.d3 = d3Object;
		// Initialize the direction texts.
		this.directions = ['upward', 'downward'];
	};
	
	/**
	 * Set variable and draw chart.
	 */
	treeChart.prototype.drawChart = function() {
		// First get tree data for both directions.
		// console.log(data);
		this.treeData = {};
		var self = this;

		// var size = 0, key;
		// var id = 0;
		// for (key in data) {
		// 	if (data.hasOwnProperty(key)){
		// 		console.log(data[key]);
		// 		data[key].x = window.innerWidth/2;
		// 		data[key].x1 = window.innerWidth/2;
		// 		data[key].y = window.innerHeight/2;
		// 		data[key].y1 = window.innerHeight/2;
		// 		data[key].id = id;
		// 		data[key].dapth = id;

		// 		size++;
		// 		id++;
		// 	}
		// }
		// // console.log(size);
		this.treeData = data;
		self.graphTree(self.getTreeConfig());
		// d3.json('data.json', function(error, data) {
		// 	console.log(data);
		// 	self.directions.forEach(function(direction) {
		// 		console.log(direction);
		// 		self.treeData[direction] = data[direction];
		// 	});
		// 	self.graphTree(self.getTreeConfig());
		// });


		// d3.json(data, function(json) {
		// 	root = json;
		// 	root.x0 = window.innerWidth / 2;
		// 	root.y0 = window.innerHeight / 2;
		// 	console.log(data);
		// 	self.directions.forEach(function(direction) {
		// 		root.x0 = window.innerWidth / 2;
		// 		root.y0 = window.innerHeight / 2;
		// 		console.log(data);
		// 		self.treeData[direction] = root[direction];
		// 	});
		// 	self.graphTree(self.getTreeConfig());
		// });

		console.log(this.treeData);
	};
	
	/**
	 * Get tree dimension configuration.
	 */
	treeChart.prototype.getTreeConfig = function() {
		var treeConfig = {'margin': {'top': 10, 'right': 5, 'bottom': 0, 'left': 30}}
		// This will be the maximum dimensions
		treeConfig.chartWidth = (960 - treeConfig.margin.right -
			treeConfig.margin.left);
		treeConfig.chartHeight = (500 - treeConfig.margin.top -
			treeConfig.margin.bottom);
		treeConfig.centralHeight = treeConfig.chartHeight / 2;
		treeConfig.centralWidth = treeConfig.chartWidth / 2;
		treeConfig.linkLength = 100;
		treeConfig.duration = 200;
		return treeConfig;
	};
	
	/**
	 * Graph tree based on the tree config.
	 */
	
	treeChart.prototype.graphTree = function(config) {
		var self = this;
		var d3 = this.d3;
		var linkLength = config.linkLength;
		var duration = config.duration;
		// id is used to name all the nodes;
		var id = 0;
		var diagonal = d3.svg.diagonal()
			.projection(function(d) {return [d.x, d.y]; });
		var zoom = d3.behavior.zoom()
			.scaleExtent([0.1, 2])
			.on('zoom', redraw);
		var svg = d3.select('#graph2')
			.append('svg')
			.attr('width',
				window.innerWidth - 350)
			.attr('height',
				window.innerHeight - 180)
			// .attr('width',
			// 	  config.chartWidth + config.margin.right + config.margin.left)
			// .attr('height',
			// 	  config.chartHeight + config.margin.top + config.margin.bottom)
			.on('mousedown', disableRightClick)
			.call(zoom)
			.on('dblclick.zoom', null);
		var treeG = svg.append('g')
			.attr('transform',
			'translate(' + config.margin.left + ',' + config.margin.top + ')');
		treeG.append('text').text('Our Projects')
			.attr('class', 'centralText')
			.attr('x', config.centralWidth)
			.attr('y', config.centralHeight + 5)
			.attr('text-anchor', 'middle');
		// Initialize the tree nodes and update chart.
		for (var d in this.directions) {
		var direction = this.directions[d];
		var data = self.treeData[direction];
		data.x0 = config.centralWidth;
		data.y0 = config.centralHeight;
		// Hide all children nodes other than direct generation.
		data.children.forEach(collapse);
		update(data, data, treeG);
		}
	
		/**
		 * Update nodes and links based on direction data.
		 */
		function update(source, originalData, g) {
		// Set up the upward vs downward separation.
		var direction = originalData['direction'];
		var forUpward = direction == 'upward';
		var node_class = direction + 'Node';
		var link_class = direction + 'Link';
		var downwardSign = (forUpward) ? 1 : -1;
		var nodeColor = (forUpward) ? '#37592b' : '#8b4513';
		// Reset tree layout based on direction, since the downward chart has
		// way too many nodes to fit in the screen, while we want a symmetric
		// view for upward chart.
		var nodeSpace = 50;
		var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 0]);
		//   if (forUpward) {
		// 	tree.size([config.chartWidth, config.chartHeight]);
		//   }
		tree.size([config.chartWidth, config.chartHeight]);
		var nodes = tree.nodes(originalData);
		var links = tree.links(nodes);
		// Offset x-position for downward to view the left most record.
		var offsetX = 0;
		if (!forUpward) {
			var childrenNodes = originalData[
				(originalData.children) ? 'children' : '_children'];
			offsetX = d3.min([childrenNodes[0].x, 0]);
		}
		// Normalize for fixed-depth.
		nodes.forEach(function(d) {
			d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
			d.x = d.x - offsetX;
			// Position for origin node.
			if (d.name == 'origin') {
			d.x = config.centralWidth;
			d.y += downwardSign * 25;
			}
		});
	
		// Update the node.
		var node = g.selectAll('g.' + node_class)
			.data(nodes, function(d) {return d.id || (d.id = ++id); });
		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append('g')
			.attr('class', node_class)
			.attr('transform', function(d) {
				return 'translate(' + source.x0 + ',' + source.y0 + ')'; })
			.style('cursor', function(d) {
				return (d.children || d._children) ? 'pointer' : '';})
			.on('click', click);
		nodeEnter.append('circle')
			.attr('r', 1e-6);
		// Add Text stylings for node main texts
		nodeEnter.append('text')
			.attr('x', function(d) {
				return forUpward ? -10 : 10;})
			.attr('dy', '.35em')
			.attr('text-anchor', function(d) {
				return forUpward ? 'end' : 'start';})
			.text(function(d) {
				// Text for origin node.
				if (d.name == 'origin') {
				return ((forUpward) ?
					'Outside Projects' :
					'Inside Projects'
					) + ' [Click to fold/expand all]';
				}
				// Text for summary nodes.
				if (d.repeated) {
				return '[Recurring] ' + d.name;
				}
				return d.name; })
			.style('fill-opacity', 1e-6)
			.style({'fill': function(d) {
				if (d.name == 'origin') {return nodeColor;}
			}})
			.attr('transform', function(d) {
				if (d.name != 'origin') {return 'rotate(-20)';}
			})
				;
	
		// Transition nodes to their new position.
		var nodeUpdate = node.transition()
			.duration(duration)
			.attr('transform', function(d) {
				return 'translate(' + d.x + ',' + d.y + ')'; });
		nodeUpdate.select('circle')
			.attr('r', 6)
			.style('fill', function(d) {
				if (d._children || d.children) {return nodeColor;}
			})
			.style('fill-opacity', function(d) {
				if (d.children) {return 0.35;}
			})
			// Setting summary node style as class as mass style setting is
			// not compatible to circles.
			.style('stroke-width', function(d) {
				if (d.repeated) {return 5;}
			});
	
		nodeUpdate.select('text').style('fill-opacity', 1);
	
		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr('transform', function(d) {
				return 'translate(' + source.x + ',' + source.y + ')'; })
			.remove();
		nodeExit.select('circle')
			.attr('r', 1e-6);
		nodeExit.select('text')
			.style('fill-opacity', 1e-6);
	
		// Update the links.
		var link = g.selectAll('path.' + link_class)
			.data(links, function(d) { return d.target.id; });
	
		// Enter any new links at the parent's previous position.
		link.enter().insert('path', 'g')
			.attr('class', link_class)
			.attr('d', function(d) {
				var o = {x: source.x0, y: source.y0};
				return diagonal({source: o, target: o});
			});
		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr('d', diagonal);
		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr('d', function(d) {
				var o = {x: source.x, y: source.y};
				return diagonal({source: o, target: o});
			})
			.remove();
		// Stash the old positions for transition.
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	
		/**
		 * Tree function to toggle on click.
		 */
		function click(d) {
			if (d.children) {
			d._children = d.children;
			d.children = null;
			}else {
			d.children = d._children;
			d._children = null;
			// expand all if it's the first node
			if (d.name == 'origin') {d.children.forEach(expand);}
			}
			update(d, originalData, g);
		}
		}
		// Collapse and Expand can be modified to include touched nodes.
		/**
		 * Tree function to expand all nodes.
		*/
		function expand(d) {
		if (d._children) {
			d.children = d._children;
			d.children.forEach(expand);
			d._children = null;
		}
		}
	
		/**
		 * Tree function to collapse children nodes.
		 */
		function collapse(d) {
		if (d.children && d.children.length != 0) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
		}
		}
	
		/**
		 * Tree function to redraw and zoom.
		 */
		function redraw() {
		treeG.attr('transform', 'translate(' + d3.event.translate + ')' +
			' scale(' + d3.event.scale + ')');
		}
		/**
		 * Tree functions to disable right click.
		 */
		function disableRightClick() {
		// stop zoom
		if (d3.event.button == 2) {
			console.log('No right click allowed');
			d3.event.stopImmediatePropagation();
		}
		}
	
		/**
		 * Tree sort function to sort and arrange nodes.
		 */
		function sortByDate(a, b) {
		// Compare the individuals based on participation date
		//(no need to compare when there is only 1 summary)
		var aNum = a.name.substr(a.name.lastIndexOf('(') + 1, 4);
		var bNum = b.name.substr(b.name.lastIndexOf('(') + 1, 4);
		// Sort by date, name, id.
		return d3.ascending(aNum, bNum) ||
			d3.ascending(a.name, b.name) ||
			d3.ascending(a.id, b.id);
		}
	};
	
	var d3GenerationChart = new treeChart(d3);
	d3GenerationChart.drawChart();
}
export default graph2;