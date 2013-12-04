/**
 * Util.js
 *
 * (c) 2013 Kevin Bond <http://zenstruck.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

(function($) {
    zsUtil = {
        /**
         * Constants
         */
        PHONE_MAX   : 767,
        TABLET_MIN  : 768,
        TABLET_MAX  : 991,
        MOBILE_MAX  : 991,
        DESKTOP_MIN : 992,

        /**
         * @returns {Number}
         */
        getDeviceWidth: function() {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        /**
         * @return {Boolean}
         */
        isPhone: function() {
            return (this.getDeviceWidth() <= this.PHONE_MAX);
        },

        /**
         * @return {Boolean}
         */
        isTablet: function() {
            return (this.getDeviceWidth() >= this.TABLET_MIN && this.getDeviceWidth() <= this.TABLET_MAX);
        },

        /**
         * @return {Boolean}
         */
        isMobile: function() {
            return (this.getDeviceWidth() <= this.MOBILE_MAX);
        },

        /**
         * @return {Boolean}
         */
        isDesktop: function() {
            return (this.getDeviceWidth() > this.DESKTOP_MIN);
        },

        /**
         * Allows a standard <a> tag to become a method="POST" link
         *
         * Available Options:
         *      - methodTemplate: the form field template to use for non-POST links
         *      - tokenTemplate: the form field template to use for CSRF tokens
         *      - messages: hash of default confirmation messages for each method (_all is default for every link)
         *
         * @param selector
         * @param options
         */
        postLink: function(selector, options) {
            var defaults = {
                methodTemplate: '<input type="hidden" name="_method" />',
                tokenTemplate: '<input type="hidden" name="_token" />',
                messages: {
                    _all    : null,
                    post    : null,
                    put     : null,
                    delete  : null,
                    patch   : null,
                    options : null
                }
            };

            options = $.extend(defaults, options);

            if (typeof selector === 'string') {
                selector = $(selector);
            }

            selector.on('click', function(event) {
                var $this = $(this);
                var target = $this.attr('target');
                var token = $this.data('token');
                var method = $this.data('method') ? $this.data('method').toLowerCase() : 'post';

                // look for confirmation message: element? options.messages.{method}? options.messages.all?
                var confirmMessage = $this.data('confirm-message') ? $this.data('confirm-message') : options.messages[method] ? options.messages[method] : options.messages._all;

                event.preventDefault();

                if (confirmMessage) {
                    if (!confirm(confirmMessage)) {
                        return;
                    }
                }

                // create form
                var $form = $('<form></form>')
                    .attr('method', 'POST')
                    .attr('action', $this.attr('href'))
                ;

                // add target
                if (target) {
                    $form.attr('target', target);
                }

                // add token
                if (token) {
                    $(options.tokenTemplate)
                        .attr('value', token)
                        .appendTo($form)
                    ;
                }

                // add method as hidden field if not POST
                if (method !== 'post') {
                    $(options.methodTemplate)
                        .attr('value', method.toUpperCase())
                        .appendTo($form)
                    ;
                }

                // append and submit
                $form.appendTo($('body'));
                $form.submit();
            });
        },

        /**
         * Enables an entire element to become a link
         *
         * Available Options:
         *      - targetSelector: the anchor tag selector whose href will be used (default: 'a:first')
         *      - hoverClass: the class to add to the container when hovering (default: null)
         *
         * @param selector
         * @param options
         */
        linkContainer: function(selector, options) {
            var defaults = {
                targetSelector: 'a:first',
                hoverClass: null
            };

            options = $.extend(defaults, options);

            if (typeof selector === 'string') {
                selector = $(selector);
            }

            selector
                .on('mouseenter', function() {
                    if (options.hoverClass) {
                        $(this).addClass(options.hoverClass)
                    } else {
                        $(this).css('cursor', 'pointer');
                    }
                })

                .on('mouseleave', function() {
                    if (options.hoverClass) {
                        $(this).removeClass(options.hoverClass)
                    } else {
                        $(this).css('cursor', 'auto');
                    }
                })

                .on('click', function(event) {
                    // prevent <a> elements from triggering
                    if (event.target.nodeName === 'A' || $(event.target).closest('a').length) {
                        return;
                    }

                    var $a = $(this).find(options.targetSelector);
                    var url = $a.attr('href');
                    var target = $a.attr('target');

                    if (typeof target === 'string' && target.toLowerCase() === '_blank') {
                        window.open(url);
                    } else {
                        window.location = url;
                    }
                })
            ;
        }
    };

    // jQuery Plugins
    $.fn.zsPostLink = function(options) {
        zsUtil.postLink(this, options);
    };

    $.fn.zsLinkContainer = function(options) {
        zsUtil.linkContainer(this, options);
    };
}(jQuery));
