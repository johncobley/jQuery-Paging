/****************************************************************
* jQuery Paging
* -----------------------------------------
* Author: John Cobley
* -----------------------------------------
* A simple jQuery based plugin that displays a list of clickable 
* links that can be used to navigate across pages.
*
****************************************************************/

(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var settings = $.extend({
                    "pages": 1,
                    "currentPage": 1,
                    "float": "right"
                }, options),
                $this = $(this);
                // Deprecating url
                if (settings.url)
                    settings.pagingUrl = settings.url;
                if (settings.pagingUrl == undefined && settings.pagingFunction == undefined) {
                    console.log('Either "pagingUrl" or "pagingFunction" is required.');
                    return;
                }
                $this.data("paging_settings", settings);
                $this.data("paging", true);
                methods.buildPagingList.call($this);
            });
        },
        buildPagingList: function () {
            $this = $(this),
            data = $this.data("paging");
            if (data != true) {
                console.log('Paging must be initialised before paging list can be built.');
                return;
            }
            var settings = $this.data("paging_settings");
            function addLi(ul, text, pageNumber, current) {
                var current = typeof current !== 'undefined' ? current : false;
                var li = $("<li>" + text + "</li>");
                if (current)
                    li.addClass('current');
                li.data("paging", { page: pageNumber });
                ul.append(li);
            }
            $this.empty();
            var pages = parseInt(settings.pages);
            var currentPage = parseInt(settings.currentPage);
            var first = "<span class='ui-icon ui-icon-seek-first'></span>";
            var last = "<span class='ui-icon ui-icon-seek-end'></span>";
            var prev = "<span class='ui-icon ui-icon-seek-prev'></span>";
            var next = "<span class='ui-icon ui-icon-seek-next'></span>";
            var ul = $("<ul></ul>");
            $this.addClass("pagingList");
            $this.append(ul);
            if (currentPage > 1) {
                // Add first & prev
                addLi(ul, first, 1);
                addLi(ul, prev, currentPage - 1);
            }
            if (currentPage === pages && pages > 4) {
                // Add currentPage - 4
                addLi(ul, currentPage - 4, currentPage - 4);
            }
            if (currentPage > pages - 1 && pages > 3) {
                // Add currentPage - 3
                addLi(ul, currentPage - 3, currentPage - 3);
            }
            if (currentPage > 2) {
                // Add currentPage - 2
                addLi(ul, currentPage - 2, currentPage - 2);
            }
            if (currentPage > 1) {
                // Add currentPage - 1
                addLi(ul, currentPage - 1, currentPage - 1);
            }
            // Add current page
            addLi(ul, currentPage, currentPage, true);
            if (pages > currentPage) {
                // Add current page + 1
                addLi(ul, currentPage + 1, currentPage + 1);
            }
            if (pages > currentPage + 1) {
                // Add current page + 2
                addLi(ul, currentPage + 2, currentPage + 2);
            }
            if (currentPage < 3 && pages > currentPage + 2) {
                // Add current page + 3
                addLi(ul, currentPage + 3, currentPage + 3);
            }
            if (currentPage === 1 && pages > currentPage + 3) {
                // Add current page + 4
                addLi(ul, currentPage + 4, currentPage + 4);
            }
            if (currentPage < pages) {
                // Add next & last
                addLi(ul, next, currentPage + 1);
                addLi(ul, last, pages);
            }
            $this.find("li").click(function () {
                if (settings.pagingUrl) {
                    var url = settings.pagingUrl;
                    if (url.indexOf('^') > -1)
                        url = url.replace("^", (parseInt($(this).data("paging").page) - 1));
                    else
                        url = settings.url + (parseInt($(this).data("paging").page) - 1);
                    document.location = url;
                }
                if (settings.pagingFunction) {
                    var requestedPage = parseInt($(this).data("paging").page);
                    settings.pagingFunction(requestedPage - 1);
                    settings.currentPage = requestedPage;
                    methods.buildPagingList.call($this, settings);
                }
            });
            methods.option.call($this, settings);
        },
        option: function (settings) {
            if ($(this).data("paging") != true) {
                console.log('Paging has not been initialised.');
                return;
            }
            if (typeof settings == 'object') {
                return this.each(function () {
                    var $this = $(this);
                    if (settings.float) {
                        $this.children("ul").css("float", settings.float);
                    }
                    $this.data("paging_settings", $.extend($this.data("paging_settings"), settings));
                });
            }
            else
                return $this.data("paging_settings")[settings];
        }
    };
    $.fn.paging = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error("Method " + method + " does not exist on jQuery.paging");
        }
    };
})(jQuery);
