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

function initialPython()
{
  languagePluginLoader.then(function () {
    console.log(pyodide.runPython(`
        import sys
        sys.version
    `));
    console.log(pyodide.runPython('print(1 + 2)'));
    console.log(pyodide.runPython('print(2 + 5)'));
    pyodide.loadPackage('matplotlib').then(() => {
      // matplotlib is now available
      pyodide.loadPackage('numpy').then(()=>{
        pyodide.runPython(`
        import matplotlib.pyplot as plt
        import io, base64
        x1 = (1,2,3)
        y1 = (3,4,5) 
        fig, (ax1) = plt.subplots(1)
        fig.suptitle('A tale of 2 subplots')
        ax1.plot(x1, y1)
        ax1.set_ylabel('Damped oscillation')

        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        buf.seek(0)
        img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')`);
        document.getElementById("pyplotfigure").src=pyodide.globals.img_str;
      });
    });
    // pyodide.runPython(`
    // import matplotlib.pyplot as plt
    // import matplotlib.path as mpath
    // import numpy as np
    // star = mpath.Path.unit_regular_star(6)
    // circle = mpath.Path.unit_circle()
    // verts = np.concatenate([circle.vertices, star.vertices[::-1, ...]])
    // codes = np.concatenate([circle.codes, star.codes])
    // cut_star = mpath.Path(verts, codes)
  
    // plt.plot(np.arange(10)**2, '--r', marker=cut_star, markersize=15)
    
    // plt.show()`);

    console.log("It works!");
});
}
