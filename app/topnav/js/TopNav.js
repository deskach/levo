(function (utils, evenNav, verge) {


    function init() {
        var topNavs = document.querySelectorAll(".topNav");

        _.each(topNavs, function (el) {
            el.setAttribute("data-uid", utils.getUID()); // adds a unique id (uid) to the component
            setTodayTitle(el);
            setSubTitle(el);
            setEvenNav(el);
        });
    }


    // Changes the upper case characters of '.topNav-subTitle' to pascal case
    function setSubTitle(el) {
        var subTitleEl = _.find(el.children, function (c) {
            return c.getAttribute('class') === 'topNav-subTitle';
        });

        subTitleEl.innerText = utils.toPascalCase(subTitleEl.innerText);
    }


    // Replaces '--WEEK_DAY_NAME--' and '--MONTH_NAME--' with dynamic contents in element '.topNav-title'
    function setTodayTitle(el) {
        var subTitleEl = _.find(el.children, function (c) {
            return c.getAttribute('class') === 'topNav-title';
        });

        var innerText = subTitleEl.innerText;

        innerText = innerText.replace("--WEEK_DAY_NAME--", utils.getWeekDay());
        innerText = innerText.replace("--MONTH_NAME--", utils.getMonthName());
        subTitleEl.innerText = innerText;
    }


    // gets the window viewport width
    function isMobileVP() {
        return verge.viewportW() < 768;
    }

    // set the library 'EvenNav', which evenly sizes navigation elements horizontally
    function setEvenNav(el) {

        evenNav.init(el, {
            condition: !isMobileVP() // ignores mobile
        });

        // needs a resize handler so it can clear mobile styles and recalculate when window is resized
        window.addEventListener("resize", function () {
            var isMb = isMobileVP();

            evenNav.clearClasses(el, !isMb);
            if (!isMb) evenNav.resize(el, !isMb);
        });
    }


    init();

// "app/Global/js/Utils.js", "./node_modules/verge/verge.js", "./libs/evennav/evennav.js"
})(window.utils, window.evenNav, window.verge); // adds libraries and utils