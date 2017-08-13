angular.module('climbingApp')
    .controller("graphsCtrl", ["$scope", "$location", "$http", '$timeout', function ($scope, $location, $http, $timeout) {

        $scope.graphType = ["Grade Bands", "Scores"];
        $scope.fromDate  = new Date();
        $scope.toDate  = new Date();

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        $scope.getScores = function(){
            var graphForm = {
                fromDate : $scope.fromDate.toISOString().substring(0, 10),
                toDate : $scope.toDate.toISOString().substring(0, 10)
            };
            if ($scope.graphStyle === "Grade Bands") {
                $http.get("./api/archscores", { params: graphForm })
                    .then(function (response) {

                        function drawChart() {

                            // Create the data table.
                            var data = new google.visualization.DataTable();
                            var rowData = [
                                ['spotty'],
                                ['black'],
                                ['tiger'],
                                ['blue'],
                                ['salmon'],
                                ['yellow'],
                                ['purple & yellow'],
                                ['hendrix'],
                                ['red'],
                                ['white'],
                                ['green']
                            ];
                            data.addColumn('string', 'Colour');
                            for (var i = 0; i < Object.keys(response.data).length; i++) {
                                data.addColumn('number', 'Session ' + (i + 1));
                                rowData[0].push(response.data[i].spotty);
                                rowData[1].push(response.data[i].black);
                                rowData[2].push(response.data[i].tiger);
                                rowData[3].push(response.data[i].blue);
                                rowData[4].push(response.data[i].salmon);
                                rowData[5].push(response.data[i].yellow);
                                rowData[6].push(response.data[i].purple_yellow);
                                rowData[7].push(response.data[i].hendrix);
                                rowData[8].push(response.data[i].red);
                                rowData[9].push(response.data[i].white);
                                rowData[10].push(response.data[i].green);
                            }
                            data.addRows(rowData);

                            // Set chart options
                            var options = {
                                'title': 'Climbing Results',
                                'width': 900,
                                'height': 500,
                                hAxis: {
                                    title: 'Colour'
                                },
                                vAxis: {
                                    title: 'Tops'
                                }
                            };

                            // Instantiate and draw our chart, passing in some options.
                            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                            chart.draw(data, options);
                        }

                        drawChart();

                    }, function (response) {
                        console.log("Failure");
                    });
            } else if ($scope.graphStyle === "Scores") {
                $http.get("./api/archscores", { params: graphForm })
                    .then(function (response) {

                        function drawChart() {

                            // Create the data table.
                            var data = new google.visualization.DataTable();
                            var rowData = [];
                            data.addColumn('date', 'Date');
                            data.addColumn('number', 'Score');
                            for (var i = 0; i < Object.keys(response.data).length; i++) {
                                rowData[i] = [new Date(response.data[i].score_date), response.data[i].score];
                            }

                            data.addRows(rowData);

                            // Set chart options
                            var options = {
                                'title': 'Climbing Results',
                                'width': 900,
                                'height': 500,
                                hAxis: {
                                    title: 'Date'
                                },
                                vAxis: {
                                    title: 'Score'
                                },
                                pointSize: 20,
                                pointShape: 'star'
                            };

                            var view = new google.visualization.DataView(data);
                            view.setRows(data.getSortedRows({column: 0, desc: true}));
                            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                            chart.draw(view, options);
                        }

                        drawChart();

                    }, function (response) {
                        console.log("Failure");
                    });
            }
        };
    }]);