angular.module('climbingApp')
    .controller("graphsCtrl", ["$scope", "$location", "$http", '$timeout', function ($scope, $location, $http, $timeout) {

        $scope.ids = [1,2,3,4];

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        //google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Colour');
            data.addColumn('number', 'Session 1');
            data.addColumn('number', 'Session 2');
            data.addRows([
                ['Mushrooms', 3, 4],
                ['Onions', 1, 2],
                ['Olives', 1, 1],
                ['Zucchini', 1, 0],
                ['Pepperoni', 2, 2]
            ]);

            // Set chart options
            var options = {'title':'Climbing Results',
                'width':900,
                'height':500};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }

        $scope.getScores = function(){
            drawChart();
            $http.get("./api/archscores?userId="+$scope.userId)
                .then(function(response) {
                    console.log("Score retrieved successfully, here's the result:", response.data);
                    window.alert("You score has been posted successfully");
                }, function(response){
                    console.log("Failure");
                });
        };
    }]);