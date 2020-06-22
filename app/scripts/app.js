/*!
 * A polyfill for object-fit
 *
 * @author: Toni Pinel
 *
 */

;(function (window, document) {
    'use strict';

    var supports = function () {

        var div = document.createElement('div'),
            vendors = 'Khtml Ms O Moz Webkit'.split(' '),
            len = vendors.length;

        return function (prop) {
            if (prop in div.style) return true;

            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });

            while (len--) {
                if (vendors[len] + prop in div.style) {
                    // browser supports box-shadow. Do what you need.
                    // Or use a bang (!) to test if the browser doesn't.
                    return true;
                }
            }
            return false;
        };
    }();

    var copyComputedStyle = function (from, to) {
        var computed_style_object = false;
        //trying to figure out which style object we need to use depense on the browser support
        //so we try until we have one
        computed_style_object = from.currentStyle || document.defaultView.getComputedStyle(from, null);

        //if the browser dose not support both methods we will return null
        if (!computed_style_object) return null;

        var stylePropertyValid = function (name, value) {
            //checking that the value is not a undefined
            return typeof value !== 'undefined' &&
            //checking that the value is not a object
            typeof value !== 'object' &&
            //checking that the value is not a function
            typeof value !== 'function' &&
            //checking that we dosent have empty string
            value.length > 0 &&
            //checking that the property is not int index ( happens on some browser
            value != parseInt(value);
        };

        //we iterating the computed style object and compy the style props and the values
        for (var property in computed_style_object) {
            //checking if the property and value we get are valid sinse browser have different implementations
            if (stylePropertyValid(property, computed_style_object[property])) {
                //applying the style property to the target element
                to.style[property] = computed_style_object[property];
            }
        }
    };

    if (supports('object-fit') === false) {

        var oImages = document.querySelectorAll('[data-object-fit]'),
            oDiv,
            sSource;

        for (var nKey = 0; nKey < oImages.length; nKey++) {

            oDiv = document.createElement('div');

            if (oImages[nKey].getAttribute('data-src-retina')) {
                sSource = oImages[nKey].getAttribute('data-src-retina');
            } else if (oImages[nKey].getAttribute('data-src')) {
                sSource = oImages[nKey].getAttribute('data-src');
            } else {
                sSource = oImages[nKey].src;
            }

            copyComputedStyle(oImages[nKey], oDiv);

            oDiv.style.display = "block";
            oDiv.style.backgroundImage = "url(" + sSource + ")";
            oDiv.style.backgroundPosition = "center center";
            oDiv.style.className = oImages[nKey].className;
            oDiv.style.backgroundRepeat = "no-repeat";

            switch (oImages[nKey].getAttribute('data-object-fit')) {
                case "cover":
                    oDiv.style.backgroundSize = "cover";
                    break;
                case "contain":
                    oDiv.style.backgroundSize = "contain";
                    break;
                case "fill":
                    oDiv.style.backgroundSize = "100% 100%";
                    break;
                case "none":
                    oDiv.style.backgroundSize = "auto";
                    break;
            }

            oImages[nKey].parentNode.replaceChild(oDiv, oImages[nKey]);
        }
    }
})(window, document);

function SVGInliner(elements) {
    "use strict";

    this.elements = elements;
    this.results = {};
    this.images = [];
    this.init();
}

SVGInliner.prototype.init = function () {
    "use strict";

    this.replaceImages();
};

SVGInliner.prototype.isSVG = function (img) {
    "use strict";

    if (img.hasAttribute("src")) {
        var splits = img.getAttribute("src").split(".");

        return splits[splits.length - 1].substr(0, 3) === "svg";
    } else {
        return false;
    }
};

SVGInliner.prototype.replaceImages = function () {
    "use strict";

    for (var i = 0; i < this.elements.length; i++) {
        if (this.isSVG(this.elements[i])) {
            this.images.push(new SVGImage(this.elements[i], this));
        }
    }
};

function SVGImage(img, inliner) {
    "use strict";

    this.image = img;
    this.inliner = inliner;

    if (img !== null && typeof img !== "undefined") {
        this.image.style.display = "none";

        this.getData(function (element) {
            this.createSVG(element);
            this.injectSVG();
        }.bind(this));
    }
}

SVGImage.prototype.getData = function (cb) {
    "use strict";

    var src = this.image.getAttribute("src");

    if (typeof this.inliner.results[src] !== "undefined") {
        cb(this.inliner.results[src]);
    } else {

        this.xhr = new XMLHttpRequest();
        this.xhr.onload = function (e) {
            if (this.xhr.status === 200) {
                this.inliner.results[src] = this.xhr.responseXML;

                cb(this.xhr.responseXML);
            }
        }.bind(this);
        this.xhr.open("GET", src, true);
        this.xhr.overrideMimeType("image/svg+xml");
        this.xhr.send("");
    }
};

SVGImage.prototype.createSVG = function (element) {
    "use strict";

    this.element = element.firstChild ? element.firstChild : element;

    if (this.hasHash()) {
        this.filterSVG();
    }
};

SVGImage.prototype.cloneAttributes = function () {
    "use strict";

    var className = this.image.getAttribute("class");
    if (className !== null) {
        this.element.setAttribute("class", className);
    }

    var idName = this.image.getAttribute("id");
    if (idName !== null) {
        this.element.setAttribute("id", idName);
    }
};

SVGImage.prototype.filterSVG = function () {
    "use strict";

    var hash = this.extractHash();
    var id = hash[hash.length - 1];
    var width = 0;
    var height = 0;

    var children = this.element.getElementsByTagName("svg");
    for (var i = 0; i < children.length; i++) {
        if (children[i].getAttribute("id") === id) {
            this.element = children[i];
            this.setDefaultAttributes();
        }
    }
};

SVGImage.prototype.setDefaultAttributes = function () {
    "use strict";

    this.element.setAttribute("y", "0px");
    this.element.setAttribute("x", "0px");
    this.element.setAttribute("version", "1.1");
    this.element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.element.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.element.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.element.setAttribute("xml:space", "preserve");
    this.element.removeAttribute("width");
    this.element.removeAttribute("height");
};

SVGImage.prototype.hasHash = function () {
    "use strict";

    return this.image.getAttribute("src").indexOf("#") !== -1;
};

SVGImage.prototype.extractHash = function () {
    "use strict";

    return this.image.getAttribute("src").split("#");
};

SVGImage.prototype.injectSVG = function () {
    "use strict";

    this.cloneAttributes();

    this.image.parentNode.replaceChild(this.element, this.image);
};

if (typeof module !== "undefined") {
    module.exports = SVGInliner;
}
document.addEventListener('DOMContentLoaded', function () {

    const preloader = document.querySelector('.js-preloader');
    if (preloader) {
        preloader.classList.add('hide');
        preloader.classList.remove('show');
    }

    //svg inliner
    new SVGInliner(document.querySelectorAll(".svg-to-inline"), function () {});

    //burger
    const toggleMenu = () => {
        headerBurger.addEventListener('click', () => {
            const headerMenu = document.querySelector('.js-menu');
            if (headerBurger.classList.contains('open')) {
                headerBurger.classList.remove('open');
                headerMenu.classList.remove('open');
                document.body.classList.remove('body-overflow');
            } else {
                headerBurger.classList.add('open');
                headerMenu.classList.add('open');
                document.body.classList.add('body-overflow');
            }
        });
    };

    const headerBurger = document.querySelector('.js-burger');
    if (headerBurger) {
        toggleMenu();
    }
});