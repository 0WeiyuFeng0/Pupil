function getrandom(num , mul) 
	{
   var value = [ ];
   for(i=0;i<=num;i++)
   {
    var rand = Math.random() * mul;
    value.push(rand);
   }
   return value;
  }


var data=[
    {
     opacity:0.4,
     type: 'scatter3d',
     x: getrandom(50 , -75),
     y: getrandom(50 , -75),
     z: getrandom(50 , -75),
    },
    {
     opacity:0.5,
     type: 'scatter3d',
     x: getrandom(50 , -75),
     y: getrandom(50 , 75),
     z: getrandom(50 , 75),
    },
  	{
     opacity:0.5,
     type: 'scatter3d',
     x: getrandom(50 , 100),
     y: getrandom(50 , 100),
     z: getrandom(50 , 100),
    }
];
var layout = {
  scene:{
	 aspectmode: "manual",
   aspectratio: {
     x: 1, y: 0.7, z: 1,
    },
   xaxis: {
    nticks: 9,
    range: [-200, 100],
  },
   yaxis: {
    nticks: 7,
    range: [-100, 100],
  },
   zaxis: {
   nticks: 10,
   range: [-150, 100],
  }},
};

function generateMyChart()
{
    Plotly.newPlot('myDiv', data, layout);
}

function myTest() {
    alert('Welcome to custom js');
}

target_position = [];
left_gaze_intersection = [];
right_gaze_intersection = [];

function initialPython(test_data)
{
  test_data.forEach(element => {
    this.target_position.push(element.target_position);
    this.left_gaze_intersection.push(element.left_gaze_intersection);
    this.right_gaze_intersection.push(element.right_gaze_intersection);
  });
  
  //console.log(test_data);
  languagePluginLoader.then(function () {
    console.log(pyodide.runPython(`
        import sys
        sys.version
    `));
    //console.log(pyodide.runPython('print(1 + 2)'));
    //console.log(pyodide.runPython('print(2 + 5)'));
    pyodide.loadPackage('matplotlib').then(() => {
      // matplotlib is now available
      pyodide.loadPackage('numpy').then(()=>{

        // pyodide.runPython(`
        // import matplotlib.pyplot as plt
        // import io, base64
        // import js

        // data = js.test_data

        // x1 = (1,2,3)
        // y1 = (3,4,5) 
        // fig, (ax1) = plt.subplots(1)
        // fig.suptitle('A tale of 2 subplots')
        // ax1.plot(x1, y1)
        // ax1.set_ylabel('Damped oscillation')

        // buf = io.BytesIO()
        // fig.savefig(buf, format='png')
        // buf.seek(0)
        // img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
        // print("hi: " + data)
        // `);

        pyodide.runPython(`
        import io, base64
        import matplotlib.pyplot as plt
        import js

        target_position = js.target_position
        left_gaze_intersection = js.left_gaze_intersection
        right_gaze_intersection = js.right_gaze_intersection
        length = len(target_position)


        x1 = []
        y1 = []
        
        for i in range(0,length-1):
          if(target_position[i] != ""):
            as_list = str(target_position[i]).strip("()")
            as_list2 = as_list.split(",")
            x1.append(float(as_list2[0].strip(" ")))
            y1.append(float(as_list2[2].strip(" ")))
          

        x2 = []
        y2 = []
        for i in range(0,length-1):
          if(left_gaze_intersection[i] != ""):
            as_list = str(left_gaze_intersection[i]).strip("()")
            as_list2 = as_list.split(",")
            x2.append(float(as_list2[0].strip(" ")))
            y2.append(float(as_list2[2].strip(" ")))

        x3 = []
        y3 = []
        for i in range(0,length-1):
          if(right_gaze_intersection[i] != ""):
            as_list = str(right_gaze_intersection[i]).strip("()")
            as_list2 = as_list.split(",")
            x3.append(float(as_list2[0].strip(" ")))
            y3.append(float(as_list2[2].strip(" ")))

        fig, (ax1) = plt.subplots(1,figsize=(6,6))

        ax1.plot(x1, y1, label = 'target')
        ax1.plot(x2, y2, label = 'left gaze')
        ax1.plot(x3, y3, label = 'right gaze')

        ax1.set_xlim(-3, 3)
        ax1.set_ylim(-3, 3)

        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        buf.seek(0)
        img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
        `);


        document.getElementById("pyplotfigure2").src=pyodide.globals.img_str;
      });
    });

    console.log("It works!");
});
}
