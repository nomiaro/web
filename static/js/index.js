(function (d3) {
'use strict';

	const svg = d3.select('svg');

	const width = +svg.attr('width');
	const height = +svg.attr('height');
	
	let Xindex;
	let Yindex;
	
	const render = (data, Xindex, Yindex) => {
		svg.selectAll("*").remove();
		
		const circleRadius = 10;
    
		const KPI = d => {
			if(d == 'Iris-setosa') return "#E6842A";
			else if(d == 'Iris-versicolor') return '#137B80';
			else return "#8E6C8A";
		};
    
		const margin = { top: 45, right: 120, bottom: 175, left: 120 };
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;
    
		const xScale = d3.scaleLinear()
			.domain([0, 1920])
			.range([0, innerWidth])
			.nice();
    
		const yScale = d3.scaleLinear()
			.domain([0, 1080])
			.range([innerHeight, 0])
			.nice();
    
		const g = svg.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);
    
		const xAxis = d3.axisBottom(xScale)
			.tickSize(-innerHeight)
			.tickPadding(15);
    
		const yAxis = d3.axisLeft(yScale)
			.tickSize(-innerWidth)
			.tickPadding(10);
    
		const yAxisG = g.append('g').call(yAxis);
		yAxisG.selectAll('.domain').remove();
    
		const xAxisG = g.append('g').call(xAxis)
			.attr('transform', `translate(0,${innerHeight})`);
    
		xAxisG.select('.domain').remove();
    
		g.append('circle')
			.attr('cy', Xindex)
			.attr('cx', Yindex)
			.attr('r', circleRadius)
			.style("fill", "purple");
	};

	function repeatedly_get(){
		fetch_from_server();
		setTimeout(repeatedly_get, 500);
	}

	repeatedly_get();
		
	function fetch_from_server(){
		var req = new XMLHttpRequest();
		req.open('GET', '/api/test');
		req.onreadystatechange = function () {
			if (req.readyState === 4) {
				console.log(req.responseText);
				process_data(req.responseText);
			}
		};
		req.send();
	}
		
	function process_data(v){
		//document.getElementById('data').innerHTML = v;
		Xindex = v['x'];
		Yindex = v['y'];
		render(data, Xindex, Yindex);
	}
}(d3));