var app = angular.module('test', []);
app.controller('d3demo', function($scope) {

    $scope.grafik = {
        "xlab": "x label",
        "ylab": "y label",
        "color": "",
        "width": "",
        "height": ""
    };

    $scope.test1 = function() {
        if ($scope.xlab !== undefined && $scope.xlab !== "") {
            $scope.grafik.xlab = $scope.xlab;
        }
        if ($scope.ylab !== undefined && $scope.ylab !== "") {
            $scope.grafik.ylab = $scope.ylab;
        }
        if ($scope.color !== undefined && $scope.color !== "") {
            $scope.grafik.color = $scope.color;
        }
        if ($scope.width !== undefined && $scope.width !== "") {
            $scope.grafik.width = $scope.width;
        }
        if ($scope.height !== undefined && $scope.height !== "") {
            $scope.grafik.height = $scope.height;
        }
        console.log($scope.grafik);
        $scope.chart($scope.grafik);
    }
    $scope.chart = function(grafik) {
        var xdata = [];
        var ydata = [];
        var tempa = [];
        a = Math.floor((Math.random() * 100) + 1);
        for (t = 0; t < 25; t++) {
            xdata.push(a + t);
            ydata.push(Math.floor((Math.random() * 100) + 1));
        }

        var mihenkdata = {
            "xdata": [1, 2, 3, 4, 5],
            "ydata": [4, 5, 6, 7, 8],
            "ranges": [
                {
                    "x_labels": ["1", "2", "3", "4", "6", "8"],
                    "y_labels": []
                }
            ],
            "opt": {
                "xlab": "x label",
                "ylab": "y label",
                "color": "",
                "width": "",
                "height": "",
                "div_id": "graph"
            }
        };

        mihenkdata.xdata = xdata;
        mihenkdata.ydata = ydata;

        /*
        var mihenkdata = {
            "dset": [
                 {
                "y": 7,
                "x": 1
            },
            {
                "y": 10,
                "x": 2
            },
            {
                "y": 3,
                "x": 3
            },
            {
                "y": 10,
                "x": 4
            },
            {
                "y": 1,
                "x": 5
            },
            {
                "y": 1,
                "x": 6
            },
            {
                "y": 9,
                "x": 7
            },
            {
                "y": 1,
                "x": 8
            },
            {
                "y": 10,
                "x": 9
            },
            {
                "y": 4,
                "x": 10
            }
            ],
            "ranges": [
                {
                    "x_labels": ["1", "2", "3", "4", "6", "8"],
                    "y_labels": []
                }
            ],
            "opt": {
                "xlab": "x label",
                "ylab": "y label",
                "color": "",
                "width": "",
                "height": "",
                "div_id":"graph"
            }
        };
        */

        var mihenkdata2 = {
            "xdata": [4, 5, 6, 7, 8],
            "ydata": [1, 2, 3, 4, 5],
            "ranges": [
                {
                    "x_labels": ["1", "2", "3", "4", "6", "8"],
                    "y_labels": []
                }
            ],
            "opt": {
                "xlab": "x label",
                "ylab": "y label",
                "color": "",
                "width": "",
                "height": "",
                "div_id": "graph2"
            }
        }

        var mihenkdata3 = {
            "dset": [
                {
                    "ymin": 10.4,
                    "lower": 14.5,
                    "middle": 15.5,
                    "upper": 18.4,
                    "ymax": 21.5,
                    "x": 3
                },
                {
                    "ymin": 17.8,
                    "lower": 21,
                    "middle": 22.8,
                    "upper": 28.075,
                    "ymax": 33.9,
                    "x": 4
                },
                {
                    "ymin": 15,
                    "lower": 15.8,
                    "middle": 19.7,
                    "upper": 26,
                    "ymax": 30.4,
                    "x": 5
                },
                {
                    "ymin": 10.4,
                    "lower": 14.5,
                    "middle": 15.5,
                    "upper": 18.4,
                    "ymax": 21.5,
                    "x": 6
                },
                {
                    "ymin": 17.8,
                    "lower": 21,
                    "middle": 22.8,
                    "upper": 28.075,
                    "ymax": 33.9,
                    "x": 7
                },
                {
                    "ymin": 15,
                    "lower": 15.8,
                    "middle": 19.7,
                    "upper": 26,
                    "ymax": 30.4,
                    "x": 8
                },

                {
                    "ymin": 10.4,
                    "lower": 14.5,
                    "middle": 15.5,
                    "upper": 18.4,
                    "ymax": 21.5,
                    "x": 9
                },
                {
                    "ymin": 17.8,
                    "lower": 21,
                    "middle": 22.8,
                    "upper": 28.075,
                    "ymax": 33.9,
                    "x": 10
                },
                {
                    "ymin": 15,
                    "lower": 15.8,
                    "middle": 19.7,
                    "upper": 26,
                    "ymax": 30.4,
                    "x": 11
                },
                {
                    "ymin": 10.4,
                    "lower": 14.5,
                    "middle": 15.5,
                    "upper": 18.4,
                    "ymax": 21.5,
                    "x": 12
                },
                {
                    "ymin": 17.8,
                    "lower": 21,
                    "middle": 22.8,
                    "upper": 28.075,
                    "ymax": 33.9,
                    "x": 13
                },
                {
                    "ymin": 15,
                    "lower": 15.8,
                    "middle": 19.7,
                    "upper": 26,
                    "ymax": 30.4,
                    "x": 14
                }
            ],
            "ranges": [
                {
                    "x.range": [2.4, 14.6],
                    "x.labels": ["3", "4", "5"],
                    "x.major": [0.1875, 0.5, 0.8125],
                    "x.minor": {},
                    "x.major_source": [1, 2, 3],
                    "x.minor_source": {},
                    "y.range": [9.225, 35.075],
                    "y.labels": ["10", "15", "20", "25", "30", "35"],
                    "y.major": [0.03, 0.2234, 0.4168, 0.6103, 0.8037, 0.9971],
                    "y.minor": [0.03, 0.1267, 0.2234, 0.3201, 0.4168, 0.5135, 0.6103, 0.707, 0.8037, 0.9004, 0.9971],
                    "y.major_source": [10, 15, 20, 25, 30, 35],
                    "y.minor_source": [10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35]
                }
            ],
            "opt":{
                "xlab": "x label",
                "ylab": "y label",
                "color": "",
                "width": "",
                "height": "",
                "div_id": "graph3"
            }
        }
        
        mihenkdata2.xdata = ydata;
        mihenkdata2.ydata = xdata;
        //console.log(mihenkdata);

        mihenk.barchart(mihenkdata);
        mihenk.barhorizontal(mihenkdata2);
        //barchart(dset, ranges, grafik);

        mihenk.box(mihenkdata3);

    }

    $scope.svgindir = function(val) {

        //var mySVG = document.querySelector('svg'),      // Inline SVG element
        //tgtImage = document.querySelector('img');
        var mySVG = d3.select("#" + val).select("svg")[0][0],
            tgtImage = d3.select("#imagenone");     // Where to draw the result
        can = document.createElement('canvas'), // Not shown on page
            //can      = document.querySelector('canvas'),
            ctx = can.getContext('2d'),
            loader = new Image();                        // Not shown on page

        loader.width = can.width = 700;
        loader.height = can.height = 500;
        loader.onload = function() {
            ctx.drawImage(loader, 0, 0, loader.width, loader.height);
            tgtImage.src = can.toDataURL();
        };
        var svgAsXML = (new XMLSerializer).serializeToString(mySVG);
        //loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
        loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
        var a = document.createElement('a');
        a.download = "image.svg";
        //console.log(can);
        //a.href = can.toDataURL('image/png');
        a.href = loader.src;
        document.body.appendChild(a);
        //window.open(loader.src);

        a.click();
    }
    $scope.pngindir = function(val) {
        //console.log(d3.select("#"+val).select("svg")[0][0]);
        saveSvgAsPng(d3.select("#" + val).select("svg")[0][0], "diagram.png", { backgroundColor: "white", scale: 2 });
    }
});
