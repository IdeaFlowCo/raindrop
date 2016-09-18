var React   = require('react');

const GRAPH_STYLE = {
    'graphWidth': 560,
    'graphHeight': 500,
    'charge': -400,
    'linkDistance': 200,
    'nodeWidth': 120,
    'nodeHeight': 80,
    'nodeClasses': [
        "purple", "red", "blue", "orange", "green", "magenta"
    ],
    'nodeRadius': 5,
    'maximumInitialTicks': 300,
    'minimumInitialStability': 1e-2,
    'maxLabelLength': 15
};

class GraphView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "nodes": this.props.nodes,
            "edges": this.props.edges
        }
    }

    componentDidMount() {
        this.renderGraph();
    }

    componentDidUpdate() {
        this.renderGraph();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.nodesEqual(nextProps.nodes, this.props.nodes) ||
          !this.nodesEqual(nextState.nodes, this.state.nodes) ||
          !this.edgesEqual(nextProps.edges, this.props.edges) ||
          !this.edgesEqual(nextState.edges, this.props.edges);
    }

    nodesEqual(nodes, otherNodes) {
        if (nodes.length != otherNodes.length) {
            return false;
        }
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].text != otherNodes[i].text) {
                return false;
            }
        }
        return true;
    }

    edgesEqual(edges, otherEdges) {
        if (edges.length != otherEdges.length) {
            return false;
        }
        for (var i = 0; i < edges.length; i++) {
            if (edges[i].source != otherEdges[i].source || edges[i].target != otherEdges[i].target) {
                return false;
            }
        }
        return true;
    }

    render() {
        return (
            <div className="graph-view-container">
                <input className="idea-input"
                             onChange={()=>this.filterIdeas(this.props.nodes, this.props.edges)}
                             ref="searchIdeaInput" type="text"
                             placeholder="Search Ideas" />
                <svg className="graph-view"
                     width={GRAPH_STYLE.graphWidth}
                     height={GRAPH_STYLE.graphHeight}
                     ref="svg"></svg>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.filterIdeas(nextProps.nodes, nextProps.edges);
    }

    filterIdeas(nodes, edges) {
        let newNodes = [];
        let newIndexMap = {};
        nodes.forEach((node, index, array) => {
            if (node.text.toLowerCase().startsWith(this.refs.searchIdeaInput.value.toLowerCase())) {
                newNodes.push(node);
                newIndexMap[index] = newNodes.length - 1;
            }
        });
        let newEdges = [];
        edges.forEach((edge, index, array) => {
            if (newNodes[newIndexMap[edge.source]] && newNodes[newIndexMap[edge.target]]) {
                newEdges.push({
                    "source": newIndexMap[edge.source],
                    "target": newIndexMap[edge.target]
                });
            }
        });
        this.setState({
            "nodes": newNodes,
            "edges": newEdges
        });
    }

    renderGraph() {
        let nodesCopy = JSON.parse(JSON.stringify(this.state.nodes));
        let edgesCopy = JSON.parse(JSON.stringify(this.state.edges));

        let zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", function() {
                container.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
                svg.select("foreignObject").attr("transform", "translate(" + d3.event.translate
                  + ") scale(" + d3.event.scale + ")");
            });

        let force = d3.layout.force()
            .size([GRAPH_STYLE.graphWidth, GRAPH_STYLE.graphHeight])
            .charge(GRAPH_STYLE.charge)
            .linkDistance(GRAPH_STYLE.linkDistance)
            .on("tick", function() {
                edge.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                rectangle.attr("x", function(d) { return d.x - GRAPH_STYLE.nodeWidth / 2; })
                    .attr("y", function(d) { return d.y - GRAPH_STYLE.nodeHeight / 2; });

                text.attr("x", function(d) { return d.x })
                    .attr("class", "label")
                    .attr("y", function(d) { return d.y })
                    .attr('dy', 0)
            });

        let drag = force.drag()
            .on("dragstart", function(d) {
                d3.event.sourceEvent.stopPropagation();
                d3.select(this).classed("fixed", d.fixed = true);
            });

        let svg = d3.select(this.refs.svg)
            .style("pointer-events", "all");

        svg.selectAll("*")
            .remove();

        force
            .nodes(nodesCopy)
            .links(edgesCopy)
            .start();

        let container = svg.append("g");

        svg.call(zoom);

        let edge = container.selectAll(".edge")
            .data(edgesCopy)
            .enter()
            .append("line")
            .attr("class", "edge");

        let node = container.selectAll(".node")
            .data(nodesCopy)
            .enter()
            .append("g");

        let rectangle = node.append("rect")
            .attr("class", (d) => {
                let classIndex = nodesCopy.indexOf(d);
                return "node " + GRAPH_STYLE.nodeClasses[classIndex % GRAPH_STYLE.nodeClasses.length];
            })
            .attr("width", GRAPH_STYLE.nodeWidth)
            .attr("height", GRAPH_STYLE.nodeHeight)
            .attr('rx', GRAPH_STYLE.nodeRadius)
            .attr('ry', GRAPH_STYLE.nodeRadius)
            .style("pointer-events", "all")
            .on("dblclick", function() {
                d3.select(this).classed("fixed", d.fixed = false);
            })
            .call(drag);

        let text = node.append("text")
            .text(function(d) {
                    if(d.text.length > GRAPH_STYLE.maxLabelLength) {
                        return d.text.substring(0, GRAPH_STYLE.maxLabelLength) + '...';
                    }
                    else {
                        return d.text;
                    }
                })
            .attr("width", GRAPH_STYLE.nodeWidth)
            .attr("height", GRAPH_STYLE.nodeHeight)
            .attr("text-anchor", "middle");

        let counter = 0;
        while ((force.alpha() > GRAPH_STYLE.minimumInitialStability) && (counter < GRAPH_STYLE.maximumInitialTicks)) {
            force.tick();
            counter += 1;
        }
    }
}

module.exports = GraphView;
