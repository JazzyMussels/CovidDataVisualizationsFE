            // import * as d3 from 'd3'


//       setBarData = (data) => {
//       const canvasHeight = 250
//       const canvasWidth = 600
//       const yAx = d3.scaleLinear()
//       .domain([0, 70000])
//       .range([5000, 5000])
//       const svgCanvas = d3.select(this.refs.canvas)
//       .append('svg')
//       .attr('width', canvasWidth)
//       .attr('height', canvasHeight)
//       .style('border', '1px solid black')

//       svgCanvas.selectAll('rect')
//       .data(data).enter()
//       .append('rect')
//       .attr('width', 97)
//       .attr('height', (datapoint) => datapoint * 1200)
//       .attr('fill', 'orange')
//       .attr('x', (datapoint, iteration) => iteration * 125)
//       .attr('y', (datapoint, iteration) => canvasHeight - datapoint / 500)

//       svgCanvas.selectAll("text")
//       .data(data).enter()
//       .append("text")
//       .attr("x", (dataPoint, i) => i * 129)
//       .attr("y", (dataPoint, i) => canvasHeight - dataPoint / 490)
//       .text(dataPoint => dataPoint)

//       svgCanvas.append('g')
//       .attr('transform', 'translate(0,0)')
//       .call(d3.axisLeft(yAx))

// }
    
// {
//   "Bronx": {
//     "BOROUGH_GROUP": "Bronx",
//     "CASE_COUNT": "49741",
//     "CASE_RATE": "3473.21",
//     "DEATH_COUNT": "3927",
//     "DEATH_RATE": "274.21",
//     "HOSPITALIZED_COUNT": "12612",
//     "HOSPITALIZED_RATE": "880.65"
//   },

            
            
            // this.setBarData([data["Bronx"].CASE_COUNT,
            // data["Brooklyn"].CASE_COUNT,
            // data['Manhattan'].CASE_COUNT,
            // data['Queens'].CASE_COUNT,
            // data['StatenIsland'].CASE_COUNT])



             // const styles = {
            //   container: {
            //     display: "grid",
            //     justifyItems: "center"
            //   }
            // };



               {/* <div ref="canvas" style={styles.container}>
                 <h1 style={{ textAlign: "center" }}>Hi, I'm the bar chart</h1>
              </div> */}



 // updateAbbreviation = () => {
    //     console.log('running')
    //     switch (this.state.borough){
    //         case 'Bronx':
    //         this.setState({
    //             abbreviation: 'BX_'
    //         })
    //         break;
    //         case 'Brooklyn':
    //             this.setState({
    //                 abbreviation: 'BK_'
    //             })
    //         break;
    //         case 'Manhattan':
    //             this.setState({
    //                 abbreviation: 'MN_'
    //             })
    //         break;
    //         case 'Queens':
    //             this.setState({
    //                 abbreviation: 'QN_'
    //             })
    //         break;
    //         case 'StatenIsland':
    //             this.setState({
    //                 abbreviation: 'SI_'
    //             })
    //         break;
    //         default: 
    //         this.setState({
    //             abbreviation: 'unset'
    //         })
    //     }
    // }