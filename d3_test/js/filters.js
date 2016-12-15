var filters = {
    media:{PRESS: true, CONSUMER: true},
    gender:{MALE:true, FEMALE: true, UNKNOWN: true},
    country:{ZA: true, GB: true, US: true, AU: true, GR: true, GL: true, NG: true, NL: true, FR: true, CA: true}
};

var filtersWrapper = document.getElementsByClassName('filtersWrapper')[0];

//Hide the filters for tv
if(typeof tv != 'undefined' && tv) {
    filtersWrapper.style.display = 'none';
}

//View management
function toggleFilter(section, filter) {
    filters[section][filter] = !filters[section][filter];

    updateFilterClasses();

    d3.select('#chart svg')
        .datum(processData())
        .call(chart);
}

function updateFilterClasses() {
    _.each(filters, function(section) {
        _.each(section, function(value, filter) {
            if(value) {
                u.addClass(document.getElementById(filter), 'active');
            }
            else {
                u.removeClass(document.getElementById(filter), 'active');
            }
        })
    })
}

function toggleFiltersPanel() {
    u.toggleClass(filtersWrapper, 'open');
}