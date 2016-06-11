var app = angular.module('test', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'about.html',
                controller: 'aboutCtrl'
            })
            .when('/showcase', {
                templateUrl: 'showcase.html',
                controller: 'showCtrl'
            })
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'd3demo'
            })
            .otherwise({
                redirectTo: '/home'
            });
        $locationProvider.html5Mode(true);
    }]);
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
        //console.log($scope.grafik);
        $scope.chart($scope.grafik);
    }

    $scope.test2 = function() {
        $scope.chart2($scope.grafik);
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
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph"
            }
        };

        mihenkdata.xdata = xdata;
        mihenkdata.ydata = ydata;

        var mihenkdata2 = {
            "xdata": [4, 5, 6, 7, 8],
            "ydata": [1, 2, 3, 4, 5],
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph2"
            }
        }

        var mihenkdata3 = {
            "data": [
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
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph3"
            }
        }

        mihenkdata2.xdata = ydata;
        mihenkdata2.ydata = xdata;
        //console.log(mihenkdata);

        mihenkdata4 = {
            "data": [
                {
                    "y": 16.1067,
                    "ymin": 14.4004,
                    "ymax": 17.8129,
                    "x": 3
                },
                {
                    "y": 24.5333,
                    "ymin": 21.5478,
                    "ymax": 27.5189,
                    "x": 4
                },
                {
                    "y": 21.38,
                    "ymin": 15.5433,
                    "ymax": 27.2167,
                    "x": 5
                }
            ],
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph4"
            }
        }

        mihenkdata5 = {
            "xdata": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "ydata": [21, 18, 23, 16, 25, 20, 27, 35, 29, 18, 16, 26, 33, 19, 35],
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph5"
            }
        }

        mihenk.barchart(mihenkdata);
        mihenk.barhorizontal(mihenkdata2);
        //barchart(dset, ranges, grafik);

        mihenk.box(mihenkdata3);
        mihenk.error(mihenkdata4);
        mihenk.line(mihenkdata5);

    }

    $scope.chart2 = function(grafik) {
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
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph"
            }
        };
        mihenkdata.xdata = xdata;
        mihenkdata.ydata = ydata;
        mihenk.barchart(mihenkdata);

    }

    $scope.barhorizontal = function() {
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
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph"
            }
        };

        //mihenkdata.xdata = ydata;
        //mihenkdata.ydata = xdata;
        mihenk.barhorizontal(mihenkdata);
    };

    $scope.barvertical = function() {
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
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph"
            }
        };

        //mihenkdata.xdata = xdata;
        //mihenkdata.ydata = ydata;
        mihenk.barchart(mihenkdata);
    };

    $scope.box = function() {
        var mihenkdata = {
            "data": [
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
                }
            ],
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph3"
            }
        }

        mihenk.box(mihenkdata);
    }

    $scope.error = function() {
        var mihenkdata = {
            "data": [
                {
                    "y": 16.1067,
                    "ymin": 14.4004,
                    "ymax": 17.8129,
                    "x": 3
                },
                {
                    "y": 24.5333,
                    "ymin": 21.5478,
                    "ymax": 27.5189,
                    "x": 4
                },
                {
                    "y": 21.38,
                    "ymin": 15.5433,
                    "ymax": 27.2167,
                    "x": 5
                }
            ],
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph4"
            }
        }

        mihenk.error(mihenkdata);
    }

    $scope.line = function() {
        var mihenkdata = {
            "xdata": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "ydata": [21, 18, 23, 16, 25, 20, 27, 35, 29, 18, 16, 26, 33, 19, 35],
            "opt": {
                "x_labels": [],
                "y_labels": [],
                "zoom": true,
                "xlab": "x label",
                "ylab": "y label",
                "color": [],
                "div_id": "graph5"
            }
        }

        mihenk.line(mihenkdata);
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

app.controller('aboutCtrl',function($scope){
    
});

app.controller('showCtrl',function($scope){
    
});
