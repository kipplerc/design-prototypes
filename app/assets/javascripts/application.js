// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// = require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

"use strict";

$(document).ready(main);

$(document).on("page:change", main);

function main() {

	$(".search-submit").click(function(e) {
		var searchText = $("#edit-search").val().toLowerCase();
		if (searchText == "right to buy") {
			e.preventDefault();
			window.location = "no_results"
		}
	});


	$("input[type=checkbox]").click(function() {
		var contributionFilters = $(".contribution-filters input[type=checkbox]");
		var contributionFilterState = getFilterState(contributionFilters);
		var houseFilters = $(".house-filters input[type=checkbox]");
		var houseFilterState = getFilterState(houseFilters);
		// var dataType = $(this).attr("name");
		// if (dataType === "commons" || dataType === "lords") {
		// 	filterMembersByHouse.call(this, dataType);
		// 	filterMembersByData(filters);
		// }
		// else {
		// 	filterMembersByData(filters);
		// }
		filterMembers(contributionFilterState, 'filter', 'fvisible');
		filterMembers(houseFilterState, 'house', 'hvisible');
		updateResults();
		updateCounter();
	});

	$("a[href='#']").click(function() {
		alert("This is a prototype so this link doesn't go anywhere yet.");
	});

	// function filterMembersByHouse(house) {
	// 	// var cards = $('.card');
	// 	// for(var i = 0; i < cards.length; i++){
	// 	// 	if($(card[i]).data('house') === house){
	// 	// 	}
	// 	// }
	// 	if($(this).prop("checked")) {
	// 		$('div[data-house='+house+']').fadeIn(100);
	// 	}
	// 	else {
	// 		$('div[data-house='+house+']').fadeOut(100);
	// 	}
	// }

	function filterMembers(filters, inputAttribute, outputAttribute) {
		var cards = $('.card');
		cards.each(function(index, item) {
			var dataAttributes = $(item).data(inputAttribute).split(' ');
			var intersection = dataAttributes.filter(function(tag) {
			    return filters[tag];
			});
			$(item).data(outputAttribute, intersection.length !== 0);
 		});
	}

	function getFilterState(inputs){
		var filters = {};
		inputs.each(function(index, item) { filters[item.name] = item.checked });
		return filters;
	}

	function updateResults(){
		var cards = $('.card');
		cards.each(function(index, item) {
			var jItem = $(item);
			if(jItem.data('fvisible') && jItem.data('hvisible')){
				jItem.show();
			}else{
				jItem.hide();
			}
		})
	}

	function updateCounter() {
		var visibleCards = $('.card:visible').length;
		$('.js-results-counter').text(visibleCards);
	}
}
