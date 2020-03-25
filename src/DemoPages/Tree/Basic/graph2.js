import $ from "jquery";
// import * as d3 from './../../../assets/js/d3.v3.min.js';
import * as d3 from './d3.v3.min.js';
import * as data from './data/data.json';
// import * as tip from './../../../assets/js/d3-tip.min.js';
var getDepth = function (obj) {
	var depth = 0;
	if (obj.children) {
		obj.children.forEach(function (d) {
			var tmpDepth = getDepth(d)
			if (tmpDepth > depth) {
				depth = tmpDepth
			}
		})
	}
	return 1 + depth
}

var graph2 = (dom_element_to_append_to) => {
		// console.log(data.children);
		var width = 0,
		children = 0,
		childArr = [];
		childArr.push(data.children);
		// console.log(childArr);
		children++;
		// console.log(childArr[0]);
		
		while (childArr.length > 0){
			// console.log(childArr[0].length);
			if (childArr[0] != null){
				for(let i = 0; i< childArr[0].length; i++){
					childArr.push(childArr[0][i].children)
				}
				children += childArr[0].length;
			}
			childArr.splice(0, 1)
			// console.log(childArr);
			// console.log(children);
		}
		width = getDepth(data)
	
		var stepGap = 150,
		barHeight = 35,
		barWidth = 500,
		w = barWidth + ((width - 1) * 50),
		// var w = 960,
		h = (children * 35) + 25,
		// h = 3500,
		i = 0,
		// barWidth = w * .6,
		duration = 400,
		root;
	
		var tree = d3.layout.tree()
			.size([h,stepGap]);
	
		var diagonal = d3.svg.diagonal()
			.projection(function(d) { return [d.y, d.x]; });
	
		var vis = d3.select(dom_element_to_append_to).append("svg:svg")
			.attr("width", w)
			.attr("height", h)
		.append("svg:g")
			.attr("transform", "translate(20,30)");
	
		// });
		data.x0 = 0;
		data.y0 = 0;
		update(root = data);
	
		function update(source) {
	
		// Compute the flattened node list. TODO use d3.layout.hierarchy.
		var nodes = tree.nodes(root);
		
		// Compute the "layout".
		nodes.forEach(function(n, i) {
			n.x = i * barHeight;
		});
		
		// Update the nodes…
		var node = vis.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });
		
		var nodeEnter = node.enter().append("svg:g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
			.style("opacity", 1e-6);
	
		// Enter any new nodes at the parent's previous position.
		nodeEnter.append("svg:rect")
			.attr("class", "treerect")
			.attr("y", -barHeight / 2)
			.attr("height", barHeight)
			.attr("width", barWidth)
			.attr("rx",2)
			.attr("ry",2)
			.style("fill", color)
			.on("click", click);
		
		nodeEnter.append("svg:a")
			.attr("xlink:href","http://localhost:3000/#/dashboards/home")
			.append("svg:text")
			.attr("x",10)
			.attr("dy", 3.5)
			.attr("dx", 10)
			.attr("fill","#000")
			//.attr("fill",function(d) {return (d.children) ? "#000" : "#ccc";})
			//.attr("stroke", function(d) {return (d.children) ? "#000" : "#ccc";})
			.text(function(d) { return d.name; });
			//.on("click",follow);
		
		// Transition nodes to their new position.
		nodeEnter.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
			.style("opacity", 1);
		
		node.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
			.style("opacity", 1)
			.select("rect")
			.style("fill", color);
		
		// Transition exiting nodes to the parent's new position.
		node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
			.style("opacity", 1e-6)
			.remove();
		
		// Update the links…
		var link = vis.selectAll("path.link")
			.data(tree.links(nodes), function(d) { return d.target.id; });
		
		// Enter any new links at the parent's previous position.
		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {x: source.x0, y: source.y0};
				return diagonal({source: o, target: o});
			})
			.transition()
			.duration(duration)
			.attr("d", diagonal);
		
		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", diagonal);
		
		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = {x: source.x, y: source.y};
				return diagonal({source: o, target: o});
			})
			.remove();
		
		// Stash the old positions for transition.
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
		}
	
		// Toggle children on click.
		function click(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		update(d);
		}
	
		function color(d) {
		return d._children ? "#3182bd" : d.children ? "#c6dbef" : "rgba(0, 153, 255, 0)";
		}
}
export default graph2;