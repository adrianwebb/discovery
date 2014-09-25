// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var LayoutManager = {
    init: function() {
        Events.subscribe('dataLoaded', this.render.bind(LayoutManager));
        Events.subscribe('contentChanged', this.updateSAM);
        Events.subscribe('contentChanged', this.updateResultsInfo);
    },

    updateSAM: function(results) {
        if ($.isEmptyObject(results) === false) {
            var dateObj = new Date(results['samLoad']);
            $("#sam_load").text("SAM data updated: " + (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear().toString().substring(2));
        }
    },

    updateResultsInfo: function(results) {
        var totalResults, totalPools, resultsStr;
        if ($.isEmptyObject(results)) {
            totalResults = 0;
            totalPools = 0;
        }
        else {
            totalResults = results.total.toString();
            totalPools = results.results.length;
        }

        if (totalPools === 1) {
            resultsStr = totalResults + " vendors match your search";
        } 
        else {
            resultsStr =  totalResults + " vendors in " + totalPools + " pool(s) match your search";
        }

        $(".results_pool_name_number_pool").text("Pool " + results.results[0]['number'] + ": ");
        $(".results_pool_name_number_description").text(results.results[0]['name']);

        //generate csv link (sloppy)
        var pathArray = window.location.href.split('/');
        pathArray.splice(4, 0, "csv");
        console.log(pathArray.join('/'));
        $("#csv_link").attr("href", pathArray.join('/'));
        
        $("#number_of_results span").text(resultsStr);
        $("#your_search").text($("#naics-code option:selected").text());
        $("#your_filters").text(
            $("#setaside-filters input:checkbox:checked").map(function() {
                return $(this).parent().text();
            }).get().join(', ')
        );

        $("#your_search_criteria").show();
    },

    toTitleCase: function(str) {
        // from http://stackoverflow.com/questions/5097875/help-parsing-string-city-state-zip-with-javascript
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

    urlInsertCSV: function() {

    }
};
